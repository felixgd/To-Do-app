var mongoose = require('mongoose');
var db = require('../libs/db')();

module.exports = (function () {

var User = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    status: {type: Boolean,
      default: true
    },
    token : {type: String, expires:"1s"},
    createdAt: {type: Date, default: Date.now},
    lists :[{type: mongoose.Schema.Types.ObjectId, ref: 'list'}]
  },{collection:'User'});

  User.plugin(require('mongoose-unique-validator', {message: "Error"}));

  return mongoose.model('user',User);
})();