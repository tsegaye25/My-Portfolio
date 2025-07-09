const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  proficiency: {
    type: Number,
    required: true
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model('skill', SkillSchema);
