const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const adminSchema = new Schema({
    idUser: [ { type : Schema.Types.ObjectId, ref: 'User' } ],
    username: String,
    password: String,
    name: String,
    lastname: String,
    email: String
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
const Admin = mongoose.model('Admin',adminSchema);
module.exports = Admin;