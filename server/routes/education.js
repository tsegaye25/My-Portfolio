const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Import Education model (will create this later)
const Education = require('../models/Education');

// @route   GET api/education
// @desc    Get all education entries
// @access  Public
router.get('/', async (req, res) => {
  try {
    const education = await Education.find().sort({ from: -1 });
    res.json(education);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/education
// @desc    Create an education entry
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { school, degree, fieldOfStudy, from, to, current, description } = req.body;
    
    const newEducation = new Education({
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description
    });
    
    const education = await newEducation.save();
    res.json(education);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/education/:id
// @desc    Update an education entry
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    
    if (!education) {
      return res.status(404).json({ msg: 'Education not found' });
    }
    
    const { school, degree, fieldOfStudy, from, to, current, description } = req.body;
    
    // Update fields
    if (school) education.school = school;
    if (degree) education.degree = degree;
    if (fieldOfStudy) education.fieldOfStudy = fieldOfStudy;
    if (from) education.from = from;
    if (to) education.to = to;
    if (current !== undefined) education.current = current;
    if (description) education.description = description;
    
    await education.save();
    res.json(education);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Education not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/education/:id
// @desc    Delete an education entry
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    
    if (!education) {
      return res.status(404).json({ msg: 'Education not found' });
    }
    
    await education.deleteOne();
    res.json({ msg: 'Education removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Education not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
