
const mongoose = require('./db'); // Import the mongoose instance
const userSchema = new mongoose.Schema({
    id:Number,
    first_name: String,
    last_name:String,
     email: String,
     gender:String,
     avatar: String,
   domain: String,
   available: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
