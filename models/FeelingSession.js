const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User         = require("../models/User");
const Picture = require("../models/Picture");

const feelingSessionSchema = new Schema({
    idUser: [ { type : Schema.Types.ObjectId, ref: 'User' } ],
    idPicture: [ { type : Schema.Types.ObjectId, ref: 'Picture' } ]
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      }
});

const FeelingSession =mongoose.model('FeelingSession', feelingSessionSchema);
module.exports = FeelingSession;