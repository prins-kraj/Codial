const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const { profile } = require('console');


// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: "1024697355235-jfn3nic8a4e80v9eumfki2e3a22ero0a.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8000/users/auth/google/callback"
}, 

function (accessToken, refreshToken, profile, done) {
    // find a user
    User.findOne({email: profile.emails[0].value}).exec(function (err, user) {
        if(err){console.log('error in google strategy-passport', err); return;}
        
        console.log(accessToken, refreshToken);
        console.log(profile);

        if (user) {
            // if found , set this user as req.user
            return done(null, user);
        }else{
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            }, function (err, user) {
                if(err){console.log('error in creating user google strategy-passport', err); return;}

                return done(null, user);
            });
        }
    });
}));

module.exports = passport;