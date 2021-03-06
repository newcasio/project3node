var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var router = express.Router();


var passportConfig = require('../passport');

//import the 'userController' controller
var user_controller = require('../controllers/userController');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


//all these routes are begin with 'users'
//when any of these routes are requested, function in userController.js run.


//GET request for specific user
// router.get('/profile/:email', (passport.authenticate('jwt', {session:false}), user_controller.user_detail));

router.route('/profile')
  .get(passport.authenticate('jwt', {session:false}),user_controller.user_detail);

// router.get('/profile/:email', user_controller.user_detail);

router.route('/profile/bookdel')
  .post(passport.authenticate('jwt', {session:false}),user_controller.user_detail_del);


//POST request for creating user
router.post('/create', user_controller.user_create_post);

//user sign in
router.post('/signIn', user_controller.user_signIn);


//POST request for updating user   ADD TO READING LIST
router.route('/profile/update')
// router.route('/profile/:email/update')
.post(passport.authenticate('jwt', {session:false}),user_controller.user_update_post);

// router.post('/profile/:email/update', function(req, res, next) {
//   res.send('))))))))))))))))))))))))))))))))))))))))))))')
// });


module.exports = router;
