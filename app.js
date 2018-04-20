//serverside js

const express = require("express");
const app = express();
var path = require("path");
const bodyParser = require('body-parser')

app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: true}));

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
    user.create({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            password : req.body.password
        }, 
        function (err, users) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(users);
        });
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
  res.render("login.jade"); 
});
//writes the login request
app.post('/login', function(req, res){
  console.log(req.body.password);
  console.log(req.body.email);
  user.findOne({ email: req.body.email }, function (err, user) {
    if (err) return handleError(err);
    if (!user) {
      if (req.body.password === user.password) {
        res.status(200).send("!logged in, success ");
      }
    }else {
      res.status(200).send("!invalid login");
    }
    
    console.log('YOYOY %s %s %s.', user.firstname, user.email,
    user.password);
  });
});



app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
console.log("Yippee its running");

});