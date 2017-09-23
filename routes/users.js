var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//GET register page
router.get('/register', function(req, res, next) {
  res.render('auth/register');
});

module.exports = router;
