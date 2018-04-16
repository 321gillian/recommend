var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  image: String,
  hash: String, //makes up the password
  salt: String //makes up password
}, {timestamps: true});

mongoose.model('User', UserSchema);