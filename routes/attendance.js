const express = require('express');
const Attendance = require('../models/Attendance');

const router = express.Router();

// Mark attendance
router.post('/', async (req, res) => {
  try {
    const { employeeId, date, status } = req.body;
    if (!employeeId || !date || !status) return res.status(400).json({ error: 'All fields required' });
    const attendance = new Attendance({ employeeId, date: new Date(date), status });
    await attendance.save();
    res.status(201).json(attendance);
  } catch (err) {
    if (err.code === 11000) res.status(400).json({ error: 'Attendance already marked for this date' });
    else res.status(500).json({ error: 'Server error' });
  }
});

// Get attendance for an employee (with optional date filter)
router.get('/:employeeId', async (req, res) => {
  try {
    const { date } = req.query;
    let query = { employeeId: req.params.employeeId };
    if (date) query.date = new Date(date);
    const records = await Attendance.find(query);
    const totalPresent = records.filter(r => r.status === 'Present').length;
    res.json({ records, totalPresent });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;