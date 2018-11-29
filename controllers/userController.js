var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var router = express.Router();
var bcrypt = require('bcryptjs');

var User = require('../models/user');


signToken = user =>{
  // console.log('signToken user arg:', user);
  return jwt.sign({        //create token.  the object here is the payload of the JWT
    sub: user.email,
    exp: new Date().setDate(new Date().getDate()+1)   //current date plus 1
  },'chicken');            //secret key
}


//These are functions that are associated with the routes in the routes/user.js file.

//When a route/endpoint is requested, the associated function here will run.

//display detail page for specific user
exports.user_detail = function(req,res){
  console.log('THIS IS DIFFERENT', req);
  res.json(req.user.books);
  // User.findOne({email:req.user}, 'email books')
  // .exec((err, results)=>{
  //   res.json(results)
  // })
};
// exports.user_detail = function(req,res){
//   User.findOne({email:'bradley@ga.co'}, 'email books')  ///////////////////------------------------------
//   .exec((err, results)=>{
//     res.json(results)
//   })
// };


exports.user_detail_del = function(req,res){
  let toDelete = req.body.dataToSend;
  let index = req.user.books.findIndex(x=>x.id == toDelete.bookToDelete.id);
  req.user.books.splice(index,1);
  req.user.save();
  res.json({saved:true});
};
// exports.user_detail_del = function(req,res){
//   let toDelete = req.body.dataToSend;
//   // res.send(toDelete.user);
//   // console.log(toDelete.bookToDelete);
//   User.findOne({email: toDelete.user}, function(req,unit){
//     // console.log(res.books);       //returns user object.books array of objects
//     let index = unit.books.findIndex(x=>x.id == toDelete.bookToDelete.id);     //index of book to be deleted
//     unit.books.splice(index, 1);
//     unit.save();
//     res.json({saved: true});
//     // console.log(res.books);
//   })
// }


//handle user create on POST
exports.user_create_post = function(req,res){
  // res.send(req.body)
  // console.log(req.body);

  var newUser = new User({
    email: req.body.email,
    password: req.body.password
  });
  //want to hash password before save below.  This will be done in the models/users file.
  newUser.save(function(err){
    if (err) throw (err);
    // res.send('User created successfully')
    const token= signToken(newUser);
    // console.log('SIGNUP NEW USER object', newUser);
    res.status(200).json({token});
  });

  //generate token
};

exports.user_signIn = function(req,res){
  User.findOne({email:req.body.email}, function(err,user){
    if(err){
      return res.status(400).send('Badl request');
    }else if (user){
      bcrypt.compare(req.body.password, user.password, function(err, result){
        if(err) {
          console.log('BAD LOGG IN');
          return res.status(401).json({failed: 'Unauthorized Access'});
        }else{
          console.log('GOOD LOG IN');
          const token = signToken( user );
          res.status(200).json({token})
        }
      })

    }
  })
};


//handle user update POST
exports.user_update_post = function(req,res){
  // res.send(req.body);
  // console.log('UPDATE POST REQ', req.user);
  req.user.books.push(req.body.dataToSend.groupedInfo);
  req.user.save();        //save modified object
  res.json({saved: true});



};
