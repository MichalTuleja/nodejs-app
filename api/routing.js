"use strict";

const express = require("express");

var controllers = require('require-all')({
    dirname     :  __dirname + '/controllers',
    filter      :  /(.+Controller)\.js$/,
    excludeDirs :  /^\.(git|svn)$/,
    recursive   : false
});

function init() {
    var router = express.Router();
    
    // Defaults
    router.get("/", controllers.GenericController.defaultAction);
    router.get("/init", controllers.GenericController.initializeDatabase);
    
    // Authentication
//    router.get("/login", controllers.AuthController.checkStatus);
//    router.get("/logoff", controllers.AuthController.logoff);
//    router.post("/login", controllers.AuthController.login);

    // Data 
    router.get("/schema/:name", controllers.GenericController.getSchema);
    router.post("/schema/:name", controllers.GenericController.validateData);
    router.post("/validate/:name", controllers.GenericController.validateData);
    
    router.get("/collection", controllers.GenericController.listCollections);
    router.get("/collection/:name", controllers.GenericController.listDataIds);
    router.put("/collection/:name", controllers.GenericController.insertData);
    router.post("/collection/:name/:id", controllers.GenericController.updateData);
    


    // User management
//    router.get("/users/:id", controllers.UserController.noop);
//    router.put("/users", controllers.UserController.noop);
//    router.post("/users/:id", controllers.UserController.noop);
    
    return router;
}

module.exports = init();