"use strict";

const Q = require('q');
const ErrorService = require('./ErrorService');
const Sequelize = require('sequelize');
const Validator = require('jsonschema').Validator;
const uuid = require('node-uuid');
const SchemaDefinitions = require('require-all')({
  dirname: __dirname + '/../schema',
  filter: /(.+)\.json$/,
  excludeDirs: /^\.(git|svn)$/,
  recursive: false
});
const SchemaInstance = 4;
const appConfig = require('../../config/dev.js');

var database = {};

var DataService = {
  validate: validate,
  create: create,
  update: update,
  query: query,
  getCollections: getCollections,
  getSchema: getSchema
};


function getSchema(schemaName) {
  return Q.promise((resolve, reject) => {
    if(SchemaDefinitions[schemaName]) {
      resolve(SchemaDefinitions[schemaName]);
    }
    else {
      resolve(false);
    }
  }).catch(ErrorService.generalError);
}

function getCollections() {
  
}

function validate(schemaName, data) {
  var v = new Validator();
  var result =  v.validate(SchemaInstance, SchemaDefinitions[schemaName]);
  return Q.promise((resolve, reject) => {
    console.log(result);
    resolve(result);
  }); 
}

function connect(databaseName) {
  if (!database[databaseName]) {
    database[databaseName] = new Sequelize(databaseName, '', '', appConfig.database);
  }
}

function convertSchema(schema) {
  var User = sequelize.define('user', {
    username: Sequelize.STRING,
    birthday: Sequelize.DATE
  });
}

function update(collection, data) {
  if (data.id) {
    return sequelize.sync().then(function () {
      return User.update(data, {
        where: {
          id: data.id
        }
      });
    }).then(function(result) {
      console.log('Updated');
    });
  } else {
    return false;
  }
}

function create(collection, data) {
  data.id = uuid.v1();
  sequelize.sync().then(function () {
    return User.create(data);
  }).then(function (result) {
    console.log('Updated');
  });
}

function query() {
  User.findAll().then(function (users) {
    console.log(users)
  });
}


module.exports = DataService;