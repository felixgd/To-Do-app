var User = require('../models/user');
var List = require('../models/list');
var Task = require('../models/task');
var db = require('../libs/db');
var path = require("path");
var express = require('express');
var app = express();
var crypto = require('crypto');
var cookieSession = require('cookie-session');

var { body,validationResult } = require('express-validator/check');
var { sanitizeBody } = require('express-validator/filter');

function render_dashboard(req,res){
    User.findOne({username: req.session['username']})
    .populate({path:'lists', model:'list', populate :{path: 'tasks', model: 'task'}})
    .exec(function(err, found_user){
        if(err){
            console.log(err);
            return res.render('Session'); //with error
        }
    console.log(found_user);

    let data_to_render = found_user;

    return res.render('Session', data_to_render);
});

   
}

exports.dashboard_controller_main = function(req,res){
    console.log(req.session['username']);
    if(req.session['username'] == null){
        return res.redirect('/');
   }else{
       console.log('cookie conocida');
       render_dashboard(req,res);
   }
}

exports.dashboard_controller_main_post = function(req, res){
    console.log('asdasdasd');
}

exports.dashboard_controller_logout = function(req, res){
    console.log(req.session['username']);
    req.session['username'] = null;
    console.log('sesion eliminada');
    if(req.session['username'] == null){
         return res.redirect('/');
    }else{
        console.log('test');
        req.session['username'] = null;
        console.log('sesion eliminada');
        return res.redirect('/');
    }
    
}