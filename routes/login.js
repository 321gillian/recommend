//server side for login
var express = require('express');
var router = express.Router();
var path = require("path");
//route to render the login.jade page 
router.get('/', function(req, res) {
  res.render("login.jade"); 
});

//route to accepting first and last name when the user logs in.
router.post('/login', function(req, res) {
  let username_variable = req.body.username;
  let password_variable = req.body.password;
  res.send(" " + username_variable + " "+ password_variable); //here we instruct the api to retrive both first name and last name
});

//login 
router.post('/login', (req, res) => {
  console.log('new login!')
});

module.exports = router;