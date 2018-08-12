const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("../models/User");
const psychologistSchema = new Schema({
    idUser: [ { type : Schema.Types.ObjectId, ref: 'User' } ],
    medicalLicenseNumber: Number,
    university1: String,
    university2: String,
    experience: String
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  const Psychologist = mongoose.model('Psychologist', psychologistSchema);
  module.exports = Psychologist;