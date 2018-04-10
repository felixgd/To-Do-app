var User = require('../models/user');
var db = require('../libs/db');
var path = require("path");
var express = require('express');
var app = express();
var bcrypt = require ('bcrypt');
var salt = 10;
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var cookieSession = require('cookie-session');


var { body,validationResult } = require('express-validator/check');
var { sanitizeBody } = require('express-validator/filter');

var token;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'nodemailer.test1337@gmail.com',
           pass: 'felixjose17'
       }
   });

exports.user_controller_signup_post = [

    body('username','The username have to be between 5 and 12 characters').isLength({min: 5, max: 12}),
    body('password', 'The password have to be between 8 and 24 characters').isLength({min:8, max: 24}),
    sanitizeBody('username').trim().escape(),
    sanitizeBody('email').trim().escape(),
    sanitizeBody('password').trim().escape(),
    sanitizeBody('Vpassword').trim().escape(),
    (req, res, next) =>{

        const errors = validationResult(req);
            if(req.body.password==req.body.Vpassword){

        var nuser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        /*if(!erros.isEmpty()) {
            console.log('found error');
           //res.render('Sign_up');
            return;
        }else{*/
            User.findOne({'username': req.body.username})
            .exec(function(err, found_user){
                if (err) {return next (err);}

                if (found_user){
                    console.log('user found');
                    //res.redirect('/user/User_Found');
                }else{
            User.findOne({'email': req.body.email})
            .exec(function(err, found_email){
                if (err) {return next (err);}

                if (found_email){
                    console.log('email found');
                    //res.redirect('/user/User_Found');
                }else{
                        
                    if(!nuser.isModified('password')) return next ();
                         
                    bcrypt.genSalt( salt, function(err, hash){
                    if(err) return next(err);

                        nuser.password = bcrypt.hashSync(nuser.password, salt);
                            
                            // Create a verification token for this user
                        token = crypto.randomBytes(16).toString('hex');
 
                            // Save the verification token
                        nuser.token = token;
                             // Send the email
                        console.log(nuser.token);
                        send_email(token,nuser.email,req.body.host);
                    nuser.save(function(err){
                        console.log('user created', nuser);
                        
                        return res.redirect('/user/created');
                        });
                    }); 
                }
            });
        }
        });
    }else{
        console.log('Passwords dont match');
        return res.render('Sign_up');//with errors
    }
    }

];

//Log in

exports.user_controller_index_post = [

    body('username','The username has to be between 5 and 12 characters').isLength({min: 5, max: 12}),
    body('password', 'The password has to be between 8 and 24 characters').isLength({min:8, max: 24}),
    
    sanitizeBody('username').trim().escape(),
    sanitizeBody('password').trim().escape(),

    (req, res, next) =>{
        const errors = validationResult(req);

        console.log(errors);
        /*if(!erros.isEmpty()) {
            console.log('found error');
           //res.render('Index');
            return;
        }else{*/

            User.findOne({'username': req.body.username},function(err, found_user){
                if (err) {return next (err);}
                if (found_user){
                    console.log('user found');
                    var auxpass = found_user.password;
                    bcrypt.genSalt( salt, function(err, hash){
                        if(err) return next(err);

                        auxpass = bcrypt.hashSync(auxpass, salt);
                        
                        console.log(auxpass);
                        console.log(found_user.password);

                        if(true){
                            console.log('correct password');
                            

                            if(found_user.status){
                                console.log('The User is verified');
                                req.session['username'] = found_user.username;
                                console.log(req.session['username']);
                                return res.redirect('/dashboard/user/'+found_user.username);
                            }else{
                                console.log('User needs to be verified');
                                return;
                                //return res.render('Index'); With verification error
                            }
                        }else{
                            console.log('incorrect password');
                            return;
                            //return res.render('Index'); With incorrect password
                        }
                    });
                }else{
                    console.log('user not found');
                    return;
                    //return res.redirect('/user/not_found');
                   
                }
            });
      
}
];

//Index and Sign up

exports.user_controller_index = function(req, res){
    if(req.session['username'] == null){
        return res.render('Index');
    }else{
        console.log('cookie conocida');
        return res.redirect('/dashboard/user/'+req.session['username']);
    }
    
}

exports.user_controller_signup = function(req, res){
     return res.render('Sign_up');
}

exports.user_controller_create = function(req, res){
    return res.render('User_created');
}

//Change password

exports.user_controller_Cpassword_post = [
    
    body('password', 'The password have to be between 8 and 24 characters').isLength({min:8, max: 24}),
    sanitizeBody('password').trim().escape(),

    (req, res, next) =>{
        const errors = validationResult(req);

        console.log(errors);
        /*if(!erros.isEmpty()) {
            console.log('found error');
           //res.render('Index');
            return;
        }else{*/
        
        User.findOne({username : req.session['username']},function(err, found_user){
            if (err) {return next (err);}
            if (found_user){
                         
                bcrypt.genSalt( salt, function(err, hash){
                if(err) return next(err);

                req.body.password = bcrypt.hashSync(req.body.password, salt);
                User.update({username: req.session['username']}, {password: req.body.password})
                .then(doc=>{
                    if(doc){
                    console.log("password updated");
                    req.session['username'] = null;
                    return res.redirect('/');
                    }
                    });
                });
            }
        });
    }
];

exports.user_controller_Cpassword = function(req, res){
    if(req.session['username'] == null){
         return res.redirect('/');
    }else{
        console.log('cookie conocida');
        return res.render('Change_Password')
    }
}

//Change email

exports.user_controller_Cemail_post = [
    
    sanitizeBody('email').trim().escape(),

    (req, res, next) =>{
        const errors = validationResult(req);

        console.log(errors);
        /*if(!erros.isEmpty()) {
            console.log('found error');
           //res.render('Index');
            return;
        }else{*/
        
        User.findOne({username : req.session['username']},function(err, found_user){
            if (err) {return next (err);}
            if (found_user){
                token = crypto.randomBytes(16).toString('hex');
                User.update({username: req.session['username']}, {email: req.body.email, token: token, status: false})
                .then(doc=>{
                    if(doc){
                    console.log("email updated");

                    send_email(token,nuser.email, req.body.host);
                    return res.redirect('/user/created');
                    //missing activation
                    }
                });
            }
        });
        }
];

exports.user_controller_Cemail = function(req, res){
    if(req.session['username'] == null){
        return res.redirect('/');
    }else{
        console.log('cookie conocida');
        return res.render('Change_Email')
    }
}


//User Verification

exports.user_controller_verification = function(req, res){
    if(req.session['username'] == null){
        return res.redirect('/');
    }else{
        console.log('cookie conocida');
        return res.render('Change_Password')
    }
}

exports.user_controller_verification_post = [
    
    sanitizeBody('token').trim().escape(),

    (req, res, next)=>{
        const errors = validationResult(req);
    User.findOne({ token: req.body.token }, function (err, found_token) {
        if (found_token) {

                User.update({token: req.body.token}, {status: true})
                .then(doc=>{
                    if(doc){
                    console.log("status updated");
                    console.log('successfull activation');
                    return res.redirect('/');
                    }
                });
        }else{
            console.log('no matching token was found');
            //return res.render('Verification'); with errors on screen
            return;
        }

    });
}
];

exports.user_controller_created = function(req, res){
    if(req.session['username'] == null){
        return res.redirect('/');
    }else{
        console.log('cookie conocida');
        return res.render('User_created');
    }
}

function send_email(token, email, host){
    var mailOptions = { from: 'no-reply@to-doapp.com', to: email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + host + '\/verification\/' +'/'+ token +'\/' + "\nAnd enter this Token:\n " + token};
                            
        transporter.sendMail(mailOptions, function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }
    })
}

//Session handling