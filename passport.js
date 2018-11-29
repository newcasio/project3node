
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;

const cors = require('cors');

const User = require('./models/user');        //import user schema to get access to structure

console.log('WE ARE HERE');

//JWT Strategy
//.use to use middleware, specify strategy for passport, and initialize.
passport.use(new JwtStrategy({
  // jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'chicken'
}, async (payload, done) => {
  console.log('%cIN PASSPORT JWT STRATEGY', 'color: green; font-size: 16pt');
  try {
    // Find the user specified in token
    console.log('payload we are finding user by:', payload);
    const user = await User.findOne({ email: payload.sub });

    // If user doesn't exists, handle it
    if (!user) {
      console.log("JWT NO USER FOUND");
      return done(null, false);
    }
    // Otherwise, return the user
    console.log("GOOD USER JWT STRATEGTY");
    done(null, user);
  } catch(error) {
    console.log('ERRRORORORO');
    done(error, false);
  }
}));


//Local Strategy
// passport.use(new LocalStrategy({
//   usernameField: 'email'
// }, async(email, password, done)=>{
//   try{
//     // console.log('PASSPORT local STRATEGY');
//     //find the user given the email
//     const user = await User.findOne({email:email});
//
//     //if not, handle it
//     if (!user){
//       return done(null, false);
//     }
//
//     //check if password is correct
//       const isMatch = await user.isValidPassword(password);   //pass password into isValidPassword function in model/user.js
//
//     //if not handle it
//       if(!isMatch){
//         return done(null, false);
//       }
//
//     //otherwise, return user
//       done(null, user);
//
//   }catch(error){
//     done(null, false);
//   }
// }))
