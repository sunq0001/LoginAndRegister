var mongoose = require('./db.js').mongoose;
var Schema = require('./db.js').Schema; 

var userSchema = new Schema({
  username:String,
  password:String
});

var User = mongoose.model('User', userSchema);

module.exports = User; 
