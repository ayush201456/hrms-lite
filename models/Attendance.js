const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Present', 'Absent'], required: true }
});

attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true }); // Prevent duplicates

module.exports = mongoose.model('Attendance', attendanceSchema);