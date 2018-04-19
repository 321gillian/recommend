//serverside js

var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require('body-parser')
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json())

app.get('/', function(req, res) {
  res.send("Hello World"); // we set the response to send back the string hello world
  console.log("Hello World"); // used to output activity in the console
});

//route to accepting first and last name.
app.post('/login', function(req, res) {
  let firstname_variable = req.body.firstname;
  let lastname_variable = req.body.lastname;
  res.send("insert name here! " + firstname_variable + " "+ lastname_variable); //here we instruct the api to retrive both first name and last name
  console.log("name"); 
});

//route to render the index.html page with express
app.get('/index', function(req, res) {
  res.sendFile(path.join(__dirname+'/views/index.html'));
});

//route to accepting an email address.
app.get('/login', function(req, res) {
  let email_variable = req.query.email;
  res.send("insert email here " + email_variable); 
  console.log("email ready!"); 
});

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
console.log("Yippee its running");

});

