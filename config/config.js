'use strict';

var mongodbPort = 41019;

var mongodbUser = "admin";
var mongodbPass = "lolxd";
var mongoAddress = "@ds241019.mlab.com";
var mongodbHost = mongodbUser + ":" + mongodbPass + mongoAddress;

var config = {
    mongodb: {
        host: mongodbHost,
        port: mongodbPort,
        name: "tdapp"
    }
}

config.mongodb.uri = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.name}`;

module.exports = config;