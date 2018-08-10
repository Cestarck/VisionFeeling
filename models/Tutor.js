const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tutorSchema = new Schema({
    idUser: [ { type : Schema.Types.ObjectId, ref: 'User' } ],
    registerNumber: Number,
    certificateNumber: Number,
    university1: String,
    university2: String,
    experience: String,
    topics: [String]
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  const Tutor = mongoose.model('Tutor', tutorSchema);
  module.exports = Tutor;