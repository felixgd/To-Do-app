//import { Session } from 'inspector';

var List = require('../models/list');
var User = require('../models/user');
var Task = require('../models/task');
var db = require('../libs/db');
var express = require('express');
var app = express();
var path = require("path");
var cookieSession = require('cookie-session');

var { body,validationResult } = require('express-validator/check');
var { sanitizeBody } = require('express-validator/filter');

var nlist = new List;

exports.list_controller_create_post= [

sanitizeBody('listname').trim().escape(),
sanitizeBody('task').trim().escape(),


(req,res,next)=>{
    console.log(req.session['username']);
        var nlist = new List({
            listn: req.body.listname
        });

        var ntask = new Task({
            content: req.body.task
        });

        List.findOne({listn: req.body.listname})
            .exec(function(err, found_list){
                if (err) {return next (err);}

            if(found_list){
                console.log('list already created');
                User.findOne({username: req.session['username']})
                    .exec(function(err, found_user){
                        if(err){return next (err);
                        }else{

                        ntask.save(function(err, stask){
                            if(err){
                                console.log('cannot create task');
                                return res.redirect('/dashboard/user/'+req.session['username']); //with errors
                            }

                            found_list.tasks.push(stask.id);

                            found_list.save(function(err, slist){
                                if(err){
                                    console.log('cannot create list');
                                    return res.redirect('/dashboard/user/'+req.session['username']); //with errors
                                }
                                return res.redirect('/dashboard/user/'+req.session['username']);
                            });
                        });
                    }
                    });    
            }else{
                    console.log(req.session['username']);
                User.findOne({username: req.session['username']})
                    .exec(function(err, found_user){
                        if(err){return next (err);}
                        console.log(found_user);
                        nlist.user=found_user.id;
                    ntask.save(function(err, stask){
                        if(err){
                            console.log('cannot create task');
                            return res.redirect('/dashboard/user/'+req.session['username']);//with error
                        }else{
                            nlist.tasks.push(stask.id);
                    nlist.save(function(err, slist){
                        if(err){
                            console.log('cannot create list');
                                return  res.redirect('/dashboard/user/'+req.session['username']);//with error
                        }else{
                                 found_user.lists.push(slist.id);

                                 found_user.save(function(err, uuser){
                                     if (err){
                                         console.log('cannot update user');
                                         return res.redirect('/dashboard/user/'+req.session['username']); //with errors
                                     }

                                     console.log('Succesfully created list with task');
                                     return res.redirect('/dashboard/user/'+req.session['username']);
                                 })
                                    }
                                
                                
                            });
                            }
                        });
                                   
                    });
                }
            });
        }

];

exports.list_controller_task_update_post = function(req,res) {

    console.log(req.body.taskid);

    Task.findOne({_id: req.body.taskid})
        .exec(function(err, found_task){
            if(err){return next(err);}

            console.log(found_task);
            console.log(found_task.status);

        if(!found_task.status){
            found_task.status = true;
            found_task.save(function(err, utask){
                if (err){
                    console.log('cannot update task');
                    return res.err;
                }
                console.log(utask.status);
            return res.status(200);
            })
        }else{
            found_task.status = false;
            found_task.save(function(err, utask){
                if (err){
                    console.log('cannot update task');
                    return res.err;
                }
                console.log(utask.status);
            return res.status(200);
            })
        }
    })
}

exports.list_controller_delete = function(req, res) {
    console.log(req.body.listid);
    var aux= true;
    var maux= true;
    var sum = 0;
    List.find(req.body.listid)
    .exec(function(err, found_list){
        if(err){
            console.log('cannot delete list');
            return next(err);
        }
         console.log(found_list.tasks.length);
        do{
            if(maux){
            maux=false;
            Task.findByIdAndRemove(found_list.tasks[sum] , function(err, removed_task){
                if(err){
                    console.log('cannot delete task');
                    return res.next (err);
                }
                console.log('task successfully deleted');
                    sum++;
                    maux=true;
            });
            }
        }while(sum <= found_list.tasks.length);
        console.log('List successfully deleted');
        return res.redirect('/dashboard/user/'+req.session['username']);
    });
};

exports.list_controller_edit = function(req, res) {
    res.send('show');
};