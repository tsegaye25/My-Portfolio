const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Import Contact model (will create this later)
const Contact = require('../models/Contact');

// @route   GET api/contact
// @desc    Get all contact messages
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ date: -1 });
    res.json(messages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/contact
// @desc    Send a contact message
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    const newMessage = new Contact({
      name,
      email,
      subject,
      message
    });
    
    const contact = await newMessage.save();
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/contact/:id
// @desc    Delete a contact message
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({ msg: 'Message not found' });
    }
    
    await message.deleteOne();
    res.json({ msg: 'Message removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Message not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
