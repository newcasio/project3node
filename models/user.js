var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    email: {type: String, lowercase: true, required: [true, "can't be blank"], index:true, max: 30, unique: true},
    password:{type:String, required: true, min:3, max:30},
    books: []
  }
);

UserSchema.pre('save',async function(next){
  try{
    //password salting and hashing
    const salt = await bcrypt.genSalt(10);    //create a salt
    const passwordHash  = await bcrypt.hash(this.password, salt);   //create hash
    //set password to new hashed password
    this.password = passwordHash;
    next();
  }catch(error){
    next(error);
  }
});

UserSchema.methods.isValidPassword = async function(enteredPassword){
  try{
    //bcrypt.compare will take password entered by user, hash it, then compare to the saved hashed password. return true or false
    return await bcrypt.compare(enteredPassword, this.password);
  }catch(error){
    throw new Error(error);
  }
}

//Create the model
module.exports = mongoose.model('User', UserSchema);
