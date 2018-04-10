var mongoose = require('mongoose');
var db = require('../libs/db')();

module.exports = (function () {

var Task = new mongoose.Schema({
    content: String,
    status:{ type: String, default: false},
  },{collection:'Task'});

  Task.plugin(require('mongoose-unique-validator', {message: "Error"}));

  return mongoose.model('task',Task);
})();