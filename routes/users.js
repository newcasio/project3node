var express = require('express');
var router = express.Router();


//import the 'userController' controller
var user_controller = require('../controllers/userController');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
//
// router.get('/cool', function(req, res, next) {
//   res.send('I am cool');
// });



//all these routes are begin with 'user'

//when any of these routes are requested, function in userController run.



//GET request for specific user
router.get('/profile', user_controller.user_detail);

//GET request for creating user
router.get('/create', user_controller.user_create_get);
//POST request for createing user
router.post('/create', user_controller.user_create_post);

//Get request for updating user
router.get('/:id/update', user_controller.user_update_get);
//POST request for creating user
router.get('/:id/update', user_controller.user_update_post);


module.exports = router;
