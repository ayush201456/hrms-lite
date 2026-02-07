const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Employee = require('../models/Employee');

const router = express.Router();

// Add employee
router.post('/', async (req, res) => {
  try {
    const { fullName, email, department } = req.body;
    if (!fullName || !email || !department) return res.status(400).json({ error: 'All fields required' });
    const employeeId = uuidv4();
    const employee = new Employee({ employeeId, fullName, email, department });
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    if (err.code === 11000) res.status(400).json({ error: 'Email or ID already exists' });
    else res.status(500).json({ error: 'Server error' });
  }
});

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete employee
router.delete('/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;