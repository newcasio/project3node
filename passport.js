const passport  = require('passport');
const JwtStrategy = require ('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const LocalStrategy = require('passport-local');

const User = require('./models/user');        //import user schema to get access to structure


//JWT Strategy
//.use to use middleware, specify strategy for passport, and initialize.
passport.use(new JwtStrategy({
   jwtFromRequest: ExtractJwt.fromHeader('authorization'), //where the token is contained
   secretOrKey: 'chicken'                //secret key initially stated in userController when creating new user
}, async(payload,done)=>{
  try{
    //find the user specified in token
    const user = await User.findById(payload.sub);

    //if user does not exist handle it
    if (!user){
      return done(null, false);
    }

    //otherwise return user
    done(null, user);
  }catch(error){
    done(error, false);
  }
}));


//Local Strategy
passport.use(new LocalStrategy({
  usernameField: 'email'
}, async(email, password, done)=>{
  try{

    //find the user given the email
    const user = await User.findOne({email:email});

    //if not, handle it
    if (!user){
      return done(null, false);
    }

    //check if password is correct
      const isMatch = await user.isValidPassword(password);   //pass password into isValidPassword function in model/user.js

    //if not handle it
      if(!isMatch){
        return done(null, false);
      }

    //otherwise, return user
      done(null, user);

  }catch(error){
    done(error, false);
  }
}))
