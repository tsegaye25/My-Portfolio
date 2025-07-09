const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Import Experience model (will create this later)
const Experience = require('../models/Experience');

// @route   GET api/experiences
// @desc    Get all experiences
// @access  Public
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ from: -1 });
    res.json(experiences);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/experiences
// @desc    Create an experience
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { title, company, location, from, to, current, description } = req.body;
    
    const newExperience = new Experience({
      title,
      company,
      location,
      from,
      to,
      current,
      description
    });
    
    const experience = await newExperience.save();
    res.json(experience);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/experiences/:id
// @desc    Update an experience
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    
    if (!experience) {
      return res.status(404).json({ msg: 'Experience not found' });
    }
    
    const { title, company, location, from, to, current, description } = req.body;
    
    // Update fields
    if (title) experience.title = title;
    if (company) experience.company = company;
    if (location) experience.location = location;
    if (from) experience.from = from;
    if (to) experience.to = to;
    if (current !== undefined) experience.current = current;
    if (description) experience.description = description;
    
    await experience.save();
    res.json(experience);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Experience not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/experiences/:id
// @desc    Delete an experience
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    
    if (!experience) {
      return res.status(404).json({ msg: 'Experience not found' });
    }
    
    await experience.deleteOne();
    res.json({ msg: 'Experience removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Experience not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
