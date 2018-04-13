'use strict';
var express = require('express');
var router = express.Router();

var list_controller = require('../controllers/listcontroller');

    //List routes
  router.post('/create', list_controller.list_controller_create_post);

  router.post('/task/update', list_controller.list_controller_task_update_post);

  router.post('/delete', list_controller.list_controller_delete);

  router.post('/edit', list_controller.list_controller_edit);

  module.exports = router;