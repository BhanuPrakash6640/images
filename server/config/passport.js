const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
  try{
    const user = await User.findById(id);
    done(null, user);
  }catch(err){
    done(err);
  }
});

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.SERVER_URL + '/auth/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    try{
      let user = await User.findOne({ oauthId: profile.id, provider: 'google' });
      if(!user){
        user = await User.create({
          oauthId: profile.id,
          provider: 'google',
          displayName: profile.displayName,
          email: profile.emails && profile.emails[0] && profile.emails[0].value
        });
      }
      done(null, user);
    }catch(err){
      done(err);
    }
  }));
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.SERVER_URL + '/auth/github/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    try{
      let user = await User.findOne({ oauthId: profile.id, provider: 'github' });
      if(!user){
        user = await User.create({
          oauthId: profile.id,
          provider: 'github',
          displayName: profile.displayName || profile.username,
          email: profile.emails && profile.emails[0] && profile.emails[0].value
        });
      }
      done(null, user);
    }catch(err){
      done(err);
    }
  }));
}

if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.SERVER_URL + '/auth/facebook/callback',
    profileFields: ['id','displayName','emails']
  }, async (accessToken, refreshToken, profile, done) => {
    try{
      let user = await User.findOne({ oauthId: profile.id, provider: 'facebook' });
      if(!user){
        user = await User.create({
          oauthId: profile.id,
          provider: 'facebook',
          displayName: profile.displayName,
          email: profile.emails && profile.emails[0] && profile.emails[0].value
        });
      }
      done(null, user);
    }catch(err){
      done(err);
    }
  }));
}

module.exports = passport;
