'use strict';
var express = require('express');
var router = express.Router();

  var user_controller = require('../controllers/usercontroller');
    //User routes
  router.get('/', user_controller.user_controller_index);
  router.post('/', user_controller.user_controller_index_post);

  //Sign Up

  router.get('/user/sign_up', user_controller.user_controller_signup);
  router.post('/user/sign_up', user_controller.user_controller_signup_post);

  //Change Email

  router.post('/user/Change_email' ,user_controller.user_controller_Cemail_post);

  router.get('/user/Change_email', user_controller.user_controller_Cemail);

  //Change Password

  router.post('/user/Change_Password' ,user_controller.user_controller_Cpassword_post);

  router.get('/user/Change_Password', user_controller.user_controller_Cpassword);

  //User Verification

  router.post('/verification/:token', user_controller.user_controller_verification_post);

  router.get('/verification/:token', user_controller.user_controller_verification);

  //User Created

  router.get('/user/created', user_controller.user_controller_created);
  module.exports = router;
