import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";


// Passport Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback:true,

  },(request,accessToken,refreshToken,profile,done )=> {
    return done(null,profile);
  }));

//   Serialize user into session
passport.serializeUser((user,done) =>{
    done(null,user);
});

//   Deserialize user from session
passport.deserializeUser((user,done) =>{
    done(null,user);
});