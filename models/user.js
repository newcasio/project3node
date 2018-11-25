var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    email: {type: String, lowercase: true, required: [true, "can't be blank"], index:true, max: 30, unique: true},
    password:{type:String, required: true, min:3, max:30},
    books: []
  }
);


//this will change the user info to a hash before it is stored to the database.
UserSchema.pre('save', async function(next){
  const user = this;      //this refers to the current document about to be saved
  //hash(encode) the password, higher the salt number more secure
  const hash = await bcrypt.hash(this.password, 10);
  //replace original password with hashed password
  this.password = hash;
  next();   //move to next middleware
});


//this part is used to check return log in
UserSchema.methods.isValidPassword = async function(password){
  const user = this;
  //login password hashed and then compared to the saved hashed password.  Return true if match.
  const compare = await bcrypt.compare(password, user.password);
  return compare;
}

module.exports = mongoose.model('User', UserSchema);
