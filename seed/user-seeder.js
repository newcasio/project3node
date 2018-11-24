// var User = require('../models/user');
//
// var mongoose = require('mongoose');     //one time connect to mongoDB server to seed data
// mongoose.connect('mongodb://braddong:1chicken@ds027719.mlab.com:27719/user-table')

var users = [
  new User({
    "email": "brad@ga.co",
    "password": "chicken",
    "books": [
      {"name":"The big Chicken", "author": "Cluck Smith", "isbn": "4", "image": "http://fillmurray.com.400/300", "description": "Funny egg stories"},
      {"name":"Clock Gray", "author": "John Watch", "isbn": "45", "image": "http://fillmurray.com.700/500", "description": "Clocks and time"}
    ]
  }),
  new User({
    "email": "disco@ga.co",
    "password": "chicken",
    "books": [
      {"name":"The hot sunroom", "author": "Summer Man", "isbn": "42", "image": "http://fillmurray.com.450/500", "description": "Stupid sun"},
      {"name":"Clock Gray", "author": "John Watch", "isbn": "45", "image": "http://fillmurray.com.700/500", "description": "Clocks and time"}
    ]
  }),
  new User({
    "email": "whiteboard@ga.co",
    "password": "chicken",
    "books": [
      {"name":"The big Chicken", "author": "Cluck Smith", "isbn": "4", "image": "http://fillmurray.com.400/300", "description": "Funny egg stories"},
      {"name":"The hot sunroom", "author": "Summer Man", "isbn": "42", "image": "http://fillmurray.com.450/500", "description": "Stupid sun"}
    ]
  }),

];

// var done= 0;
// //loop through array of users and save each to database
// for (var i = 0; i < users.length; i++) {
//   users[i].save();
//   done++;
//   if (done===users.length){
//     exit();
//   }
// }
//
// function exit(){
//   mongoose.disconnect();
// }
