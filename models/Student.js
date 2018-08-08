const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    idUser: [ { type : Schema.Types.ObjectId, ref: 'User' } ], 
    idOrganization: [ { type : Schema.Types.ObjectId, ref: 'Organization' } ], 
    registerNumber: Number,
    underTreatment: Boolean,
    idPsychologist: [ { type : Schema.Types.ObjectId, ref: 'Psychologist' } ],
    enrolledToCourse: Boolean,
    idTutor: [ { type : Schema.Types.ObjectId, ref: 'Tutor' } ],
    problematicTopics: String
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
      } 
})

const Student = mongoose.model('Student',studentSchema);
module.exports = Student;