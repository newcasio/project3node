var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var router = express.Router();

var User = require('../models/user');


signToken = user=>{
  return jwt.sign({        //create token.  the object here is the payload of the JWT
    sub: user.id,
    exp: new Date().setDate(new Date().getDate()+1)   //current date plus 1
  },'chicken');            //secret key
}


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
    res.status(200).json({token});
  });

  //generate token
};

exports.user_signIn = function(req,res){
  User.findOne({email:req.body.email}, function(err,user){
    if(user==null){
      res.err('no user found')
    }else{
      console.log('creating a token');
      //create new token, using the current user object
      const token = signToken(req.body);
      res.status(200).json({token})
    }
    // console.log(`user object:${user}`);
  })
};
// exports.user_signIn = function(req,res){
//   User.findOne({email:req.body.email}, function(err,user){
//     if(!user){
//       res.send('no user found')
//     }else{
//       console.log('creating a token');
//       //create new token, using the current user object
//       const token = signToken(req.body);
//       res.status(200).json({token})
//     }
//   })
// };


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
