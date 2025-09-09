const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Load environment variables
require('dotenv').config();

const createAdminUser = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log('✅ Connected to MongoDB successfully');

    // Check if admin user already exists
    console.log('🔍 Checking for existing admin user...');
    const existingAdmin = await User.findOne({ email: 'admin@portfolio.com' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists with email: admin@portfolio.com');
      console.log('You can login with:');
      console.log('Email: admin@portfolio.com');
      console.log('Password: admin123');
      return;
    }

    console.log('👤 Creating new admin user...');
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Create admin user
    const admin = new User({
      name: 'Admin User',
      email: 'admin@portfolio.com',
      password: hashedPassword
    });

    await admin.save();

    console.log('🎉 Admin user created successfully!');
    console.log('📧 Email: admin@portfolio.com');
    console.log('🔑 Password: admin123');
    console.log('');
    console.log('✨ You can now login to the admin panel with these credentials.');

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code === 11000) {
      console.log('Admin user already exists!');
    }
  } finally {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('🔌 Database connection closed');
    }
  }
};

// Run the script immediately
createAdminUser().then(() => {
  console.log('✅ Script completed');
}).catch(err => {
  console.error('💥 Script failed:', err.message);
});
