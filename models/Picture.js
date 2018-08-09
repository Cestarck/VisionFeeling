const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pictureSchema = new Schema({
    idAssignedTaskSchema = [ { type : Schema.Types.ObjectId, ref: 'AssignedTask' } ],
    public_id: String,
    version: Number,//1312461204,
    width: Number,//864,
    height: Number,//576,
    format: String,//'jpg',
    bytes: Number,//120253,
    url: String,//'https://res.cloudinary.com/demo/image/upload/v1371281596/sample.jpg',
    secure_url: String//'https://res.cloudinary.com/demo/image/upload/v1371281596/sample.jpg'
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

  const Picture =mongoose.model('Picture',pictureSchema);
  module.exports=Picture;