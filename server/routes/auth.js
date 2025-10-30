const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passport'); // ensure strategies loaded

// Google
router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: process.env.CLIENT_URL || '/' }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL + '/'); // redirect back to client
  });

// GitHub
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: process.env.CLIENT_URL || '/' }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL + '/');
  });

// Facebook
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: process.env.CLIENT_URL || '/' }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL + '/');
  });

// logout
router.get('/logout', (req, res) => {
  req.logout(()=>{});
  req.session = null;
  res.json({ ok: true });
});

// current user
router.get('/me', (req, res) => {
  if(!req.user) return res.status(401).json({ user: null });
  res.json({ user: req.user });
});

module.exports = router;
