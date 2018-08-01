const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  role: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

// Foto
//   -userId - ObjectId
//   -url    - String
//   timestamps: {
//     createdAt: 'created_at',

// Tarea
//   -userId - ObjectId
//   -evaluacion - boolean, numeric, enum[Bien,MasOMenos,Mal]
