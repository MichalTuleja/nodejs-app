"use strict";

var HttpStatus = require('http-status-codes');
const DataService = require('../services/DataService');
const ErrorService = require('../services/ErrorService');

var GenericController = {
    defaultAction: unknownAction,
    listCollections: listCollections,
    storeData: storeData,
    insertData: insertData,
    updateData: updateData,
    validateData: validateData,
};

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
    var collection = req.param.name;
    var data = req.body;
    DataService.validate(collection, data).then((result) => {
        res.json(result);
    }).catch((err) => {
        ErrorService.databaseError(err);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        res.send();
    });
}

function unknownAction(req,res){
  res.json({"Message" : "Undefined action"});    
}

module.exports = GenericController;