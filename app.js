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

app.get('/' , function(req, res){
  res.render("index.jade", 
             {songs:songs} // Inside the {} option we call the products variable from line 10 above 
            ); 
  console.log("Index page is up!");
  
})



// function for login route
var login = require('./routes/login');
app.use('/login', login);

//function for signup route
//function to create new user account with signup
var signup = require('./routes/signup');
app.use('/signup', signup);




app.listen(process.env.PORT || 3003, process.env.IP || "0.0.0.0", function() {
console.log("Yippee its running");

});