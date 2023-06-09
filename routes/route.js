const express = require('express');
const passport = require('passport');
const { login } = require('../controller/login');
const { dashboard } = require('../controller/dashboard');
const { isGuest, isAuth } = require('../middleware/auth');
const {
  stories,
  addStory,
  getPublicStories,
  editStory,
  updateStory,
  deleteStory,
} = require('../controller/stories');

const Router = express.Router();

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

Router.get('/login', isGuest, login);

Router.get('/dashboard', isAuth, dashboard);

Router.get('/stories', isAuth, stories);

Router.post('/stories', isAuth, addStory);

Router.get('/stories/edit/:id', isAuth, editStory); //open single story

Router.put('/stories/edit/:id', isAuth, updateStory);

Router.delete('/stories/:id', isAuth, deleteStory);

Router.get('/public', isAuth, getPublicStories);

//google route

Router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

Router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    // successRedirect: '/auth/google/success',
    successRedirect: '/dashboard',
    failureRedirect: '/',
  })
);

// Router.get('/auth/google/failure', isLoggedIn, (req, res) => {
//   res.send('Something went wrong!');
// });

// Router.get('/auth/google/success', isLoggedIn, (req, res) => {
//   const name = req.user.displayName;
//   return res.status(200).send(`hello there! ${name}`);
// });

Router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/login');
  });
});

module.exports = Router;
