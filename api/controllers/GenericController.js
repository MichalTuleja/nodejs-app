"use strict";

var HttpStatus = require('http-status-codes');
const DataService = require('../services/DataService');
const ErrorService = require('../services/ErrorService');

var GenericController = {
  defaultAction: unknownAction,
  listCollections: listCollections,
  listDataIds: listData,
  storeData: storeData,
  insertData: insertData,
  updateData: updateData,
  validateData: validateData,
  initializeDatabase: initializeDatabase,
  getSchema: getSchema
};

function getSchema(req, res) {
  var schemaName = req.params.name;
  return DataService.getSchema(schemaName).then((schema) => {
    if(schema) {
      res.json(schema);      
    }
    else {
      res.status(HttpStatus.NOT_FOUND);
      res.send();
    }
  });
}

function listData(req, res) {
  
}

function listCollections(req, res) {
  var inputData = req.body;
  DataService.getCollections().then((result) => {
    res.json(result);
  }).catch((err) => {
    ErrorService.databaseError(err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    res.send();
  });
}

function storeData(req, res) {
  var collection = req.param.name;
  var data = req.body;
  DataService.save(collection, data).then((result) => {
    res.json(result);
  }).catch((err) => {
    ErrorService.databaseError(err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    res.send();
  });
}

function insertData(req, res) {
  var collection = req.param.name;
  var data = req.body;
  DataService.create(collection, data).then((result) => {
    res.json(result);
  }).catch((err) => {
    ErrorService.databaseError(err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    res.send();
  });
}

function updateData(req, res) {
  var collection = req.param.name;
  var data = req.body;
  DataService.update(collection, data).then((result) => {
    res.json(result);
  }).catch((err) => {
    ErrorService.databaseError(err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    res.send();
  });
}

function getAllData(req, res) {
  var collection = req.param.name;
  var query = req.body || {};
  DataService.query(collection, query).then((result) => {
    res.json(result);
  }).catch((err) => {
    ErrorService.databaseError(err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    res.send();
  });
}


function validateData(req, res) {
  var collection = req.params.name;
  var data = req.body;
  DataService.validate(collection, data).then((result) => {
    res.json(result);
  }).catch((err) => {
    ErrorService.databaseError(err);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    res.send();
  });
}

function initializeDatabase(req, res) {
  res.json({"Message" : "OK"});
}

function unknownAction(req, res) {
  res.json({"Message" : "Undefined action"});    
}

module.exports = GenericController;