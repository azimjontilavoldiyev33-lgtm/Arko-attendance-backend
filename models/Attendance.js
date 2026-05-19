const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  worker: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker', required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date },
  location: {
    latitude: { type: Number },
    longitude: { type: Number }
  }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);