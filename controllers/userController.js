var User = require('../models/user');

//package express-validator used to validate and sanitize data submitted via forms
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


//These are functions that are associated with the routes in the routes/user.js file.

//When a route/endpoint is requested, the associated function here will run.

//display detail page for specific user
// exports.user_detail = function(req,res){
//   res.send('Not implemented: User detail:'+req.params.id);
// };
exports.user_detail = function(req,res){

  // console.log(`email from params is ${req.params}`);
  // res.send('work in progress');
  User.find({email:'brad@ga.co'}, 'email books')
  .exec((err, results)=>{
    res.json(results)
  })
};


//display user create form on GET
exports.user_create_get = function(req,res){
  res.send('Not implemented: User create GET dont want this one!!');
};


//handle user create on POST
exports.user_create_post = function(req,res){
  // res.send(req.body)
  var newUser = new User({
    email: req.body.dataToSend.email,
    password: req.body.dataToSend.password
  });
  newUser.save(function(err){
    if (err) throw err;
    res.send('User created successfully')
  })
  // res.send('POST ROUTE IN BACKEND User create POST.  THis is triggered from the front end ');
};


//display user update form on GET
exports.user_update_get = function(req,res){
  res.send('Not implemented: User update GET');
};

//handle user update POST
exports.user_update_post = function(req,res){
  res.send('Not implemented: User update POST');
};
