var express = require('express');
var router = express.Router();
var path = require("path");
//route to render the signup.jade page
router.get('/', function(req, res) {
  res.render("signup.jade"); 
});

//route to accepting first and last name when the user signs up
router.post('/signup', function(req, res) {
  let firstname_variable = req.body.firstname;
  let lastname_variable = req.body.lastname;
  res.send("insert name here! " + firstname_variable + " "+ lastname_variable); //here we instruct the api to retrive both first name and last name
});

module.exports = router;