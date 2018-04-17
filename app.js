//serverside js

const express = require("express");
const app = express();
var path = require("path");
const bodyParser = require('body-parser')
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: true}))


var songs = require("./model/songs.json"); // allow the app to access the products.json file


app.get('/' , function(req, res){
  res.render("index.jade", 
             {songs:songs} // Inside the {} option we call the products variable from line 10 above 
            ); 
  console.log("Index page is up!");
  
  
})


// include routes
var login = require('./routes/login');
app.use('/login', login);

var signup = require('./routes/signup');
app.use('/signup', signup);

//signup post requests
app.post('/signup', (req, res) => {
  console.log('new sign up!')
})

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
console.log("Yippee its running");

});