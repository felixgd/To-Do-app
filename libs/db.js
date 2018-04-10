'use strict';

var mongoose = require("mongoose");
var config = require("../config/config");
var singleconnection = false;

module.exports = function() {

    if(!singleconnection){
        singleconnection = mongoose.connect(config.mongodb.uri, function(err, result){
            if(err){
                console.log(err);
                return;
            }
            console.log("success connection to the database");
        });
        return singleconnection;
    }

};