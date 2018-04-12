//serverside js

var express = require("express");
var app = express();
var path = require("path");
app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res) {
  res.send("Hello World"); // we set the response to send back the string hello world
  console.log("Hello World"); // used to output activity in the console
});

//route to accepting first and last name.
app.get('/abc', function(req, res) {
  // accept data - first name
  // accept data - SECOND name
  let firstname_variable = req.query.firstname;
  let lastname_variable = req.query.lastname;
  res.send("Hello World yo! " + firstname_variable + " "+ lastname_variable); // we set the response to send back the string hello world
  console.log("Hello World"); // used to output activity in the console
});

//route to render the index.html page with express
app.get('/index', function(req, res) {
  res.sendFile(path.join(__dirname+'/views/index.html')); // we set the response to send back the string hello world
});

// //route to accepting an email address.
// app.get('/abc', function(req, res) {
//   // accept data - first name
//   // accept data - SECOND name
//   let firstname_variable = req.query.firstname;
//   let lastname_variable = req.query.lastname;
//   res.send("Hello World yo! " + firstname_variable + " "+ lastname_variable); // we set the response to send back the string hello world
//   console.log("Hello World"); // used to output activity in the console
// });

// //route to accepting an email password.
// app.get('/abc', function(req, res) {
//   // accept data - first name
//   // accept data - SECOND name
//   let firstname_variable = req.query.firstname;
//   let lastname_variable = req.query.lastname;
//   res.send("Hello World yo! " + firstname_variable + " "+ lastname_variable); // we set the response to send back the string hello world
//   console.log("Hello World"); // used to output activity in the console
// });





app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
console.log("Yippee its running");

});

