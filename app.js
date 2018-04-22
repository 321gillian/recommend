//serverside js

const express = require("express");
const app = express();
var path = require("path");
const bodyParser = require('body-parser')
var session = require('client-sessions');

app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: true}));

//session handler middleware
app.use(session({
  cookieName: 'session',
  secret: 'i am a secret mystery music app',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

app.set("view engine", " jade");

app.use(express.static("views"));
app.use(express.static("routes"));

var mongoose = require ('mongoose');
mongoose.connect('mongodb://mysterymusicapp:mysterymusicapp@ds249079.mlab.com:49079/mysterymusicapp')

var songs = require("./model/songs.json"); // allow the app to access the products.json file
var user = require('./model/user');

app.get('/' , function(req, res){
  res.render("index.jade", 
             {songs:songs} // Inside the {} option we call the products variable from line 10 above 
            ); 
  console.log("Index page is up!");
  
})

//route to render the signup.jade page
app.get('/signup', function(req, res) {
  res.render("signup.jade"); 
});


// CREATES A NEW USER
app.post('/signup', function (req, res) {
  if (req.body.password && req.body.email &&
      req.body.firstname && req.body.lastname)
  {
    user.create({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            password : req.body.password
        }, 
        function (err, users) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send({"success":true, "msg":"user successfully created"});
        });
  }else{
    res.status(400).send({"error":"bad request"});
  }
});

// RETURNS ALL THE USERS IN THE DATABASE
app.get('/signup/users', function (req, res) {
    user.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});
//Read and take login requests
app.get('/login', function(req, res) {
  if (req.session && req.session.user)
  {
    return res.redirect('/profile');
  }else{
    res.render("login.jade"); 
  }
});

<<<<<<< HEAD
//writes the login request
app.post('/login', function(req, res){
  if (req.body.password && req.body.email){
    user.findOne({ email: req.body.email }, function (err, user) {
      if (err) return handleError(err);
      if (user) {
        if (req.body.password === user.password) {
          //sets a cookie with user info
          req.session.user = user;
          res.status(200).send({"success":true, "msg":"Successfully logged in"});
        } else {
          res.status(401).send({"success":false, "msg":"Bad Username or Password"});
        }
      }
    });
  }else{
    res.status(400).send({"success":false, "msg":"Bad Request"});
  }
});


app.get('/profile', function(req, res) {
  if (req.session && req.session.user) { // Check if session exists
    // lookup the user in the DB by pulling their email from the session
    user.findOne({ email: req.session.user.email }, function (err, user) {
      if (!user) {
        // if the user isn't found in the DB, reset the session info and
        // redirect the user to the login page
        req.session.reset();
        res.redirect('/login');
      } else {
        res.status(200).send({
          "username": user.email,
          "firstname": user.firstname,
          "lastname": user.lastname,
        });
      }
    });
  } else {
    res.status(400).send({"error":"bad request"});
  }
});

app.post('/profile/update', function(req, res) {
  if (req.body.firstname && req.body.lastname){
    if (req.session && req.session.user) { // Check if session exists
      // lookup the user in the DB by pulling their email from the session
      user.findOne({ email: req.session.user.email }, function (err, user_found) {
        if (!user_found) {
          // if the user isn't found in the DB, reset the session info and
          // redirect the user to the login page
          req.session.reset();
          res.status(500).send({
              "success": false, "msg": "unknown user failed to update profile"
          });
        } else {
          // updated firstname and lastname
          user_found.firstname = req.body.firstname
          user_found.lastname = req.body.lastname
          user_found.save(function(err, doc){
              if (err) return res.send(500, { "success": false, error: err });
              res.status(200).send({
                "success": true, "msg": "profile updated"
              });
          });
        }
      });
    }else{
      res.status(400).send({"error":"bad request"});  
    }
 }else {
    res.status(400).send({"error":"bad request"});
  }
});

app.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/login');
});
=======
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
console.log("Yippee its running");
>>>>>>> master

//route to render the profile update page
app.get('/profile_update', function(req, res) {
  res.render("profile_update.jade");
  
});

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
console.log("Yippee its running");

});