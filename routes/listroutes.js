'use strict';
var express = require('express');
var router = express.Router();

var list_controller = require('../controllers/listcontroller');
var task_controller = require('../controllers/taskcontroller');

    //List routes
  router.post('/create', list_controller.list_controller_create_post);
  //router.get('/list/create', list_controller.list_controller_create);

 // router.get('/list/edit', list_controller.list_controller_edit);

  //router.get('/list/delete', list_controller.list_controller_delete);

  module.exports = router;