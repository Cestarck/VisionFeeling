const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const managerSchema = new Schema({
    idUser: [ { type : Schema.Types.ObjectId, ref: 'User' } ],
    idOrganization: [ { type : Schema.Types.ObjectId, ref: 'Organization' } ], 
    registerNumber: Number
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  const Manager = mongoose.model('Manager', managerSchema);
  module.exports = Manager;