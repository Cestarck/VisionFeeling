const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  //idUser
  username: String,
  password: String,
  name: String,
  lastName: String,
  age: Number,
  sex: String,
  email: String,
  role: String, 
  photo: String,
  status: Boolean
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
