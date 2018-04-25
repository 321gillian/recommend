var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  

  email: String,
  password: String,
  userid: String,
  firstname: String,
  lastname: String,
  favourites: [{}],
});

mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');

