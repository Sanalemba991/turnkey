#!/usr/bin/env node

/**
 * Seed Admin User to MongoDB
 * 
 * This script creates an admin user in the database.
 * Run with: node scripts/seedAdmin.js
 * 
 * Note: In production, consider hashing passwords with bcrypt
 */

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123456';

if (!MONGODB_URI) {
  console.error('MONGODB_URI is not set in .env.local');
  process.exit(1);
}

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
});

const User = mongoose.model('User', UserSchema);

async function seedAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ username: ADMIN_USERNAME });
    if (existingAdmin) {
      console.log(`Admin user '${ADMIN_USERNAME}' already exists`);
      await mongoose.connection.close();
      process.exit(0);
    }

    // Create admin user
    const admin = new User({
      username: ADMIN_USERNAME,
      password: ADMIN_PASSWORD,
      role: 'admin',
    });

    await admin.save();
    console.log(`✓ Admin user created successfully!`);
    console.log(`  Username: ${ADMIN_USERNAME}`);
    console.log(`  Password: ${ADMIN_PASSWORD}`);
    console.log(`\n⚠️  Important: Change the password in production!`);
    console.log(`⚠️  Consider hashing passwords with bcrypt!`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
}

seedAdmin();
