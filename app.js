//serverside js

var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require('body-parser')
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json())

var songs = require("./model/songs.json"); // allow the app to access the products.json file

//route to accepting first and last name.
app.post('/login', function(req, res) {
  let firstname_variable = req.body.firstname;
  let lastname_variable = req.body.lastname;
  res.send("insert name here! " + firstname_variable + " "+ lastname_variable); //here we instruct the api to retrive both first name and last name
  console.log("name"); 
});

app.get('/' , function(req, res){
  res.render("index.jade", 
             {songs:songs} // Inside the {} option we call the products variable from line 10 above 
            ); 
  console.log("Index page is up!");
  
  
})


//route to accepting an email address.
app.get('/login', function(req, res) {
  let email_variable = req.query.email;
  res.send("insert email here " + email_variable); 
  console.log("email ready!"); 
});


app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
console.log("Yippee its running");

});