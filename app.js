//serverside js

//we chose const instead of var because we want our variable not to change after it has been intiated.
const express = require("express");
const app = express();
var path = require("path");
const bodyParser = require('body-parser')
var session = require('client-sessions');

// this tells the app thats the static pages are view and our dirname
app.use(express.static(__dirname + '/views'));

//tells the app to use the bodyparser to extract requests from the http post and display it on our app.
//this tells the system that we wnat to use json
app.use(bodyParser.json());

// tells the system to convert the url coded objects into a string
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


//this is the session handler middleware
app.use(session({
  cookieName: 'session',
  secret: 'i am a secret mystery music app',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));

//our mongoose model schema for our application data
var mongoose = require ('mongoose');
mongoose.connect('mongodb://mysterymusicapp:mysterymusicapp@ds249079.mlab.com:49079/mysterymusicapp')

//random number generator function
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}


var user = require('./model/user');


app.get('/' , function(req, res){
  res.render("index.ejs"
            ); 
  console.log("Index page is up!");
  
})


//route to render the songselector page
app.get('/songselector', function(req, res) {
  res.render("song_selector.ejs"); 
});


//tells the app to choose and display profile with selected songs
app.post('/favourite_song', function (req, res) {
  // check song_id in body and user is logged.
  // song_id is an int
  if (req.body.song_id && req.session && req.session.user)
  {
    var song_object = null;
    for (i=0; i<songs.length; i++){
        if(songs[i]['id'] === req.body.song_id){
          song_object = songs[i];
          break;
        }
    }
    if (song_object === null){
       res.status(500).send({
          "success": false, "msg": "unknown song id"
        });
    }else{
      user.findOne({ email: req.session.user.email }, function (err, user) {
        if (!user) {
          req.session.reset();
          res.status(500).send({
            "success": false, "msg": "unknown user failed to update song"
          });
        }else{
          //adding favourite song to profile
          user.favourites.push(song_object);
          user.save(function(err, doc){
              if (err) return res.send(500, { "success": false, error: err });
              res.status(200).send({
                "success": true, "msg": "profile updated with song"
              });
          });
        }
      })
    }
  }else{
    res.status(400).send({"error":"bad request"});
  }
});


//to remove an already favourited song.
app.delete('/favourite_song', function (req, res) {
  // check song_id in body and user is logged.
  // song_id is an int
  if (req.body.song_id && req.session && req.session.user)
  {
    var song_object = null;
    for (i=0; i<songs.length; i++){
        if(songs[i]['id'] === req.body.song_id){
          song_object = songs[i];
          break;
        }
    }
    if (song_object === null){
       res.status(500).send({
          "success": false, "msg": "unknown song id"
        });
    }else{
      user.findOne({ email: req.session.user.email }, function (err, user) {
        if (!user) {
          req.session.reset();
          res.status(500).send({
            "success": false, "msg": "unknown user failed to remove song"
          });
        }else{
          //removing favourite song from profile
          user.favourites.pull(song_object);
          user.save(function(err, doc){
              if (err) return res.send(500, { "success": false, error: err });
              res.status(200).send({
                "success": true, "msg": "profile removed song"
              });
          });
        }
      })
    }
  }else{
    res.status(400).send({"error":"bad request"});
  }
});

//route to render the signup.ejs page
app.get('/signup', function(req, res) {
  res.render("signup.ejs"); 
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

// returns all the users in our database
app.get('/signup/user', function (req, res) {
    user.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem finding the users.");
        res.status(200).send(users);
    });
});
//read and takes login requests
app.get('/login', function(req, res) {
  if (req.session && req.session.user)
  {
    return res.redirect('/profile');
  }else{
    res.render("login.ejs"); 
  }
});

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

//tell the app to render to the profile page
app.get('/profile', function(req, res) {
  if (req.session && req.session.user) { // Checks if session exists
    // lookup the user in the database by pulling their email from the session
    user.findOne({ email: req.session.user.email }, function (err, user) {
      if (!user) {
        // if the user isn't found in the database, this will reset the session info and
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

//tell the app to render to the profile page
app.post('/profile/update', function(req, res) {
  if (req.body.firstname && req.body.lastname){
    if (req.session && req.session.user) { // Checks if session exists
      // lookup the user in the database by pulling their email from the session
      user.findOne({ email: req.session.user.email }, function (err, user_found) {
        if (!user_found) {
          // if the user isn't found in the database, reset the session info and
          // redirect the user to the login page
          
          req.session.reset();
          res.status(500).send({
              "success": false, "msg": "unknown user failed to update profile"
          });
        } else {
          // updates the firstname and lastname
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

//route to render the logout page and makes sure that the session resets by going back to the login page
app.get('/logout', function(req, res) {
  req.session.reset();
  res.redirect('/login');
});

//route to render the profile update page and remove a song from favourites
app.get('/profile_update', function(req, res) {
  if (req.session && req.session.user){
      user.findOne({ email: req.session.user.email }, function (err, user) {
      if (!user) {
        // if the user isn't found in the database, this will reset the session info and
        // redirect the user to the login page
        req.session.reset();
        res.redirect('/login');
      } else { 
        res.render("profile_update.ejs", {"favourites": user.favourites});
       
      }
      
    });
  

    
  }else{
    res.render("profile_update.ejs");
  }
});

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function() {
console.log("Yippee its running");

});