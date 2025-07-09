const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Import Skill model (will create this later)
const Skill = require('../models/Skill');

// @route   GET api/skills
// @desc    Get all skills
// @access  Public
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1 });
    res.json(skills);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/skills
// @desc    Create a skill
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { name, icon, category, proficiency } = req.body;
    
    const newSkill = new Skill({
      name,
      icon,
      category,
      proficiency
    });
    
    const skill = await newSkill.save();
    res.json(skill);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/skills/:id
// @desc    Update a skill
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    
    if (!skill) {
      return res.status(404).json({ msg: 'Skill not found' });
    }
    
    const { name, icon, category, proficiency } = req.body;
    
    // Update fields
    if (name) skill.name = name;
    if (icon) skill.icon = icon;
    if (category) skill.category = category;
    if (proficiency) skill.proficiency = proficiency;
    
    await skill.save();
    res.json(skill);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Skill not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/skills/:id
// @desc    Delete a skill
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    
    if (!skill) {
      return res.status(404).json({ msg: 'Skill not found' });
    }
    
    await skill.deleteOne();
    res.json({ msg: 'Skill removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Skill not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
