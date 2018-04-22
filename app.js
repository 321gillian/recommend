//serverside js

const express = require("express");
const app = express();
var path = require("path");
const bodyParser = require('body-parser')
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "jade");


app.use(express.static("views"));
app.use(express.static("routes"));

var mongoose = require ('mongoose');
mongoose.connect('mongodb://mysterymusicapp:mysterymusicapp@ds249079.mlab.com:49079/mysterymusicapp')

var songs = require("./model/songs.json"); // allow the app to access the products.json file 

//random number generator function
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}




app.get('/' , function(req, res){
  var currentNumber = randomNumber(1, 12);
  //function to get random songfunction 
function findSong(which) {
  return which.id === currentNumber;
}
 //filter the songs and declare the new song as a separate variable
  detail = songs.filter(findSong);

  res.render("play.jade", 
             {detail:detail}// Inside the {} option we call the products variable from line 10 above
            ); 
  console.log("Index page is up!");
  
})


app.get('/show/:id', function(req, res){
  res.render("show.jade",  
             {detail:detail}
            );
  console.log("Show is go!")
  console.log(detail);
})




// function for login route
var login = require('./routes/login');
app.use('/login', login);

//function for signup route
//function to create new user account with signup
var signup = require('./routes/signup');
app.use('/signup', signup);




app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
console.log("Yippee its running");

});