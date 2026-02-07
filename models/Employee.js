const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, unique: true, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  department: { type: String, required: true }
});

module.exports = mongoose.model('Employee', employeeSchema);