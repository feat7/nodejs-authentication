var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('User route');
});

/* GET users dashboard. */
router.get('/dashboard', function(req, res, next) {
  res.send('User Dashboard');
});

//GET register page
router.get('/register', function(req, res, next) {
  res.render('auth/register');
});

//GET login page
router.get('/login', function(req, res, next) {
  res.render('auth/login');
});

//POST register page
router.post('/register', function(req, res, next) {
  if(req.body.password != req.body.confirm_password) {
    var err = new Error('Passwords do not match');
    err.status = 400;
    res.send("passwords do not match");
    return next(err);
  }
  if (req.body.email &&
    req.body.username &&
    req.body.password &&
    req.body.confirm_password) {
    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    }
    //use schema.create to insert data into the db
    User.create(userData, function (err, user) {
      if (err) {
        return next(err)
      } else {
        req.session.userId = user._id;
        return res.redirect('/users/dashboard');
      }
    });
  }
});

//POST login page
router.post('/login', function(req, res, next) {
  if(req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function(error, user) {
      if(error || !user) {
        var err = new Erorr('Wrong email and password combination');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/users/dashboard');
      }
    });
  } else {
    var err = new Error('All fields are required');
    err.status = 400;
    return next(err);
  }
});

module.exports = router;
