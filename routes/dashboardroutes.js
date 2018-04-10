'use strict';
var express = require('express');
var router = express.Router();

var dashboard_controller = require('../controllers/dashboardcontroller');

    //Dashboard routes
  router.post('/user/:username', dashboard_controller.dashboard_controller_main_post);
  router.get('/user/:username', dashboard_controller.dashboard_controller_main);

  router.get('/user/log_out', dashboard_controller.dashboard_controller_logout);

 // router.get('/dashboard/edit', dashboard_controller.dashboard_controller_edit);

  //router.get('/dashboard/delete', dashboard_controller.dashboard_controller_delete);

  module.exports = router;