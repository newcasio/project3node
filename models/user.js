var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    email: {type: String, lowercase: true, required: [true, "can't be blank"], index:true, max: 30},
    password:{type:String, required: true, min:3, max:30},
    books: []
  }
);

module.exports = mongoose.model('User', UserSchema);
