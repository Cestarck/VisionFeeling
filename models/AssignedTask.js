const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignedTaskSchema = new Schema({
    idUser: [ { type : Schema.Types.ObjectId, ref: 'User' } ],
    idTask: [ { type : Schema.Types.ObjectId, ref: 'Task' } ],
    releaseDate: Date,
    grade: Number,
    pic1: String,
    feeling1: String,
    pic2: String,
    feeling2: String
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  const AssignedTask = mongoose.model('AssignedTask',assignedTaskSchema);
  module.exports = AssignedTask;

