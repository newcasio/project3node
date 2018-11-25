var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');

//allow cross origin queries
const cors = require('cors');

var app = express();


//Connect to MongoDB (mLabs hosted database)
var mongoose = require('mongoose');
var mongoDB = 'mongodb://braddong:1chicken@ds027719.mlab.com:27719/user-table';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

//cors
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//routes to the middleware chain
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var secureRoute = require('./routes/users-secure')

//router middleware stack
app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/profile', passport.authenticate('jwt',{session:false}), secureRoute);


//auth
// require('./auth/auth');
//
// app.use(bodyParser.urlencoded({extended: false}));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
