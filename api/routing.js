"use strict";

const express = require("express");

var controllers = require('require-all')({
    dirname     :  __dirname + '/api/controllers',
    filter      :  /(.+Controller)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : false
});

function init() {
    var router = express.Router();
    
    // Authentication
//    router.get("/", controllers.GenericController.defaultAction);
//    router.get("/login", controllers.AuthController.checkStatus);
//    router.get("/logoff", controllers.AuthController.logoff);
//    router.post("/login", controllers.AuthController.login);

    // Data 
    router.get("/schema/:name", controllers.GenericController.getSchema);
    router.post("/schema/:name", controllers.GenericController.validate);
    router.post("/validate/:name", controllers.GenericController.validate);
    
    router.get("/collection", controllers.GenericController.getCollectionList);
    router.get("/collection/:name", controllers.GenericController.getDataList);
    router.put("/collection/:name", controllers.GenericController.insertData);
    router.post("/collection/:name/:id", controllers.GenericController.updateData);
    
    router.get("/init", controllers.GenericController.initializeDatabase);

    // User management
//    router.get("/users/:id", controllers.UserController.noop);
//    router.put("/users", controllers.UserController.noop);
//    router.post("/users/:id", controllers.UserController.noop);
    
    return router;
}

module.exports = init();