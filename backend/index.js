var express = require("express");
var cors = require('cors');
var expressApp = express();
var bodyParser = require('body-parser')

var http = require('http');
var https = require('https');
const fs = require('fs');
const path = require('path');

const { v4: uuidv4 } = require('uuid');
const fetch = require('node-fetch');
const net = require('net');
const port = 3232;


// config the express app to support json and cors and set a limit of data
expressApp.use(bodyParser.json({
    limit: '50mb'
}));

expressApp.use(bodyParser.urlencoded({
    limit: '50mb',
    parameterLimit: 100000,
    extended: true
}));

expressApp.use(cors());

const httpServer = http.createServer(expressApp);
httpServer.listen(port, () => {
    console.log('HTTP Server running on port ' + port);
});

// Init Database
var Datastore = require('nedb');
var mainDatabase = new Datastore({ filename: './mainDb', autoload: true });

// REST Calls
expressApp.get('/online', function (req, res, next) {
    console.log("I am Online!")
    res.sendStatus(200)
})