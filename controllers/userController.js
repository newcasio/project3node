var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var router = express.Router();

var User = require('../models/user');

//package express-validator used to validate and sanitize data submitted via forms
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


//These are functions that are associated with the routes in the routes/user.js file.

//When a route/endpoint is requested, the associated function here will run.

//display detail page for specific user
exports.user_detail = function(req,res){
  User.findOne({email:'brad@ga.co'}, 'email books')
  .exec((err, results)=>{
    res.json(results)
  })
};
// exports.user_detail = async(req,res,next)=>{
//   passport.authenticate('user_detail', async (err, user, info) => {     try {
//       if(err || !user){
//         const error = new Error('An Error occured')
//         return next(error);
//       }
//       req.login(user, { session : false }, async (error) => {
//         if( error ) return next(error)
//         //We don't want to store the sensitive information such as the
//         //user password in the token so we pick only the email and id
//         const body = { _id : user._id, email : user.email };
//         //Sign the JWT token and populate the payload with the user email and id
//         const token = jwt.sign({ user : body },'top_secret');
//         //Send back the token to the user
//         return res.json({ token });
//       });     } catch (error) {
//       return next(error);
//     }
//   })(req, res, next);
// };


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
};
// exports.user_create_post = function(req,res){
//   //user post to this route, passport authenticates the user using the auth/auth.js
//   passport.authenticate('signup', {session:false}), async (req,res,next)=>{
//     res.json({
//       message: 'Signup successful',
//       user: req.user
//     })
//   }
// };


//display user update form on GET
exports.user_update_get = function(req,res){
  res.send('Not implemented: User update GET');
};

//handle user update POST
exports.user_update_post = function(req,res){
  res.send('Not implemented: User update POST');
};
