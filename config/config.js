'use strict';

var mongodbPort = 27017;

var mongodbHost = "127.0.0.1";

var config = {
    mongodb: {
        host: mongodbHost,
        port: mongodbPort,
        name: "tdapp"
    }
}

config.mongodb.uri = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.name}`;

module.exports = config;