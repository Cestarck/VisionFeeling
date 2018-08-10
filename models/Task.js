const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: String,
    topics: [String],
    index: String,
    content: String //string o liga a algo
},{
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

  const Task = mongoose.model('Task',taskSchema);
  module.exports =Task;


