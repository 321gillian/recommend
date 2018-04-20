var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  username: String,
  email: String,
  password: String,
  avatar: String,
  firstname: String,
  lastname: String,
});

mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');

