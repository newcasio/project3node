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


exports.user_detail_del = function(req,res){
  let toDelete = req.body.dataToSend;
  // res.send(toDelete.user);
  // console.log(toDelete.bookToDelete);
  User.findOne({email: toDelete.user}, function(req,unit){
    // console.log(res.books);       //returns user object.books array of objects
    let index = unit.books.findIndex(x=>x.id == toDelete.bookToDelete.id);     //index of book to be deleted
    unit.books.splice(index, 1);
    unit.save();
    res.json({saved: true});
    // console.log(res.books);
  })
}


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


//display user update form on GET
exports.user_update_get = function(req,res){
  res.send('Not implemented: User update GET');
};

//handle user update POST
exports.user_update_post = function(req,res){
  // res.send(req.body);
  User.findOne({email:req.body.dataToSend.currentUser}, function(err, user){
    // res.send(user.books);   //returns an array of objects
    // res.send(req.body.dataToSend.groupedInfo);         //book object
    user.books.push(req.body.dataToSend.groupedInfo);
    // res.send(user.books);     //show book added to array
    user.save();        //save modified object
    res.json({saved: true});
  });


};
