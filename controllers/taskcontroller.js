var express = require('express');
var app = express();
app.set('view engine', 'ejs');

var task = require('../models/task')

exports.task_controller_add = function(req, res) {
    res.send('add');
};

exports.task_controller_delete = function(req, res) {
    res.send('delete');
};

exports.task_controller_update = function(req, res) {
    res.send('update');
};