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


var songs = require("./model/songs.json"); // allow the app to access the products.json file
var user = require("./model/user.json"); //allows the app to access the user

app.get('/' , function(req, res){
  res.render("index.jade", 
             {songs:songs} // Inside the {} option we call the products variable from line 10 above 
            ); 
  console.log("Index page is up!");
  
})

//function to create new user account
app.post('/signup', function(req,res){
  var count = Object.keys(firstname).length //tells us how many users we have
  console.log(count);
  //this will look for the largest id
  function getMax(firstname, id){
    var max
    for (var i=0; i<firstname.length; i++){
      if(!max || parseInt(firstname[i][id]) > parseInt(max[id]))
         max = firstname[i];
    }
    return max
  }
    var maxPpg = getMax(firstname, "id");  
    newId = maxPpg + 1;
    console.log(newId);
})



// function for login route
var login = require('./routes/login');
app.use('/login', login);
//function for signup route
var signup = require('./routes/signup');
app.use('/signup', signup);




app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
console.log("Yippee its running");

});