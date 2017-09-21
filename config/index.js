var express = require("express"),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    morgan = require('morgan'),
    path = require('path'),
    rfs = require('rotating-file-stream')

module.exports = function(app){
    var lib = require("../lib");
    var logDirectory = "./log";

    // ensure log directory exists
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

    // create a rotating write stream
    var accessLogStream = rfs(lib.getFullDate("dmY")+'_access.log', {
    interval: '1d', // rotate daily
    path: logDirectory
    });

    app.use(morgan('dev', {
        skip: function (req, res) {
            console.log(req.url);
        }, stream: accessLogStream
    }));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(function(req, res, next){
        app.use(req.url, express.static(__dirname + "./public"));
        next();
    });
}