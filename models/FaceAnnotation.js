const User         = require("../models/User");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const faceAnnotationSchema =  new Schema({
        idUser: [ { type : Schema.Types.ObjectId, ref: 'User' } ],
        idFeelingSession: [ { type : Schema.Types.ObjectId, ref: 'FeelingSession' } ],
        joyLikelihood: String,
        sorrowLikelihood: String,
        angerLikelihood: String,
        surpriseLikelihood: String,
        underExposedLikelihood: String,
        blurredLikelihood: String,
        headwearLikelihood: String
    },{
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
          }

    });
    const FaceAnnotation = mongoose.model('FaceAnnotation', faceAnnotationSchema);
    module.exports = FaceAnnotation;
