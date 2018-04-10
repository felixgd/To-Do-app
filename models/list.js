var mongoose = require('mongoose');
var db = require('../libs/db')();

module.exports = (function () {

var List = new mongoose.Schema({
    listn: String,
    user :{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    tasks :[{type: mongoose.Schema.Types.ObjectId, ref: 'task'}]
  },{collection:'List'});

  
  List.plugin(require('mongoose-unique-validator', {message: "Error"}));

  return mongoose.model('list',List);
})();