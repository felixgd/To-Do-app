var User = require('../models/user');
var triggers = require('mongo-triggers');

triggers(User).remove (function (query, next) {
    User.findOne({token:null}, function(err,doc) {
        if(doc){
            console.log('found user with no token');
            if(doc.status){
                console.log('User removed');
            doc.remove;
            }else{
                console.log('error')
            next();
            }
        }else{
            next();
        }
    });
});