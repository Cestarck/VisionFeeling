const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const tareaSchema = new Schema({
  userId: Schema.Types.ObjectId,
  fecha: Date,
  evaluacion: Number
  calificacion: { type: String, enum: ['Pesimo','Mal','Aceptable','Bien','Excelente'] }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Tarea = mongoose.model('Tarea', tareaSchema);
module.exports = Tarea;
