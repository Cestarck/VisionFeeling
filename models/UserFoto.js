const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userFotoSchema = new Schema({
  userId: Schema.Types.ObjectId,
  url: String,
  fecha: Date,
  foto: Schema.Types.Mixed
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const UserFoto = mongoose.model('UserFoto', userFotoSchema);
module.exports = UserFoto;
