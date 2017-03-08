"use strict";

const md5 = require('MD5');
const uuid = require('node-uuid');

var AuthController = {
    login: login,
    logoff: logoff,
    checkStatus: checkStatus
};

function checkStatus(req, res) {
  res.sendStatus(200);
}

function login(req, res) {
 
  var proveCredentials = function(username, passwd) {
    for(var i in users) {
      if(users[i].username.toLowerCase() === username.toLowerCase() 
         || users[i].email.toLowerCase() === username.toLowerCase()) {
        if(users[i].password === passwd) {
          return true;
        }
      }
    }
    
    return false;
  }
 
  var user = req.body.username;
  var pass = req.body.password;
  
  if(proveCredentials(user, pass)) {
    var token = uuid.v1();
   
    tokens[token] = {username: user};
   
    res.json({username: user, token: token});    
  }
  else {
    res.sendStatus(401);
  }
}

function logoff(req, res) {
  delete tokens[req.headers.authorization];
  res.json({
    "message": "logoff"
    });
}

module.exports = AuthController;