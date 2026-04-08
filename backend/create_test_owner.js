// Script to create a test owner with subscription ending in a few days
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import all models to register schemas (Owner depends on these for username uniqueness check)
const Patient = require('./models/Patient');
const Doctor = require('./models/Doctor');
const Staff = require('./models/Staff');
const Admin = require('./models/Admin');
const Owner = require('./models/Owner');
const db = require('./config/db');

async function createTestOwner() {
  try {
    await db();
    console.log('Connected to database');

    // Calculate subscription end date (5 days from now)
    const subscriptionEnd = new Date();
    subscriptionEnd.setDate(subscriptionEnd.getDate() + 5);

    // Hash password
    const hashedPassword = await bcrypt.hash('Test@123', 10);

    // Get an admin ID from the database
    const admin = await Admin.findOne();
    
    if (!admin) {
      console.log('No admin found. Please create an admin first.');
      process.exit(1);
    }

    // Check if test owner already exists
    const existingOwner = await Owner.findOne({ email: 'testlab@example.com' });
    if (existingOwner) {
      // Update the subscription end date
      existingOwner.subscription_end = subscriptionEnd;
      existingOwner.is_active = true;
      await existingOwner.save();
      console.log('Test owner updated with new subscription end date:');
      console.log({
        lab_name: existingOwner.lab_name,
        email: existingOwner.email,
        username: existingOwner.username,
        subscription_end: existingOwner.subscription_end,
        days_remaining: Math.ceil((subscriptionEnd - new Date()) / (1000 * 60 * 60 * 24))
      });
      process.exit(0);
    }

    // Create new test owner
    const testOwner = new Owner({
      lab_name: 'Test Medical Lab',
      lab_license_number: 'TML-2026-001',
      name: {
        first: 'Test',
        middle: 'Lab',
        last: 'Owner'
      },
      identity_number: '9876543210',
      birthday: new Date('1985-05-15'),
      gender: 'Male',
      social_status: 'Married',
      phone_number: '+1234567890',
      address: {
        street: '123 Test Street',
        city: 'Test City',
        state: 'Test State',
        postal_code: '12345',
        country: 'Test Country'
      },
      qualification: 'PhD in Laboratory Medicine',
      profession_license: 'PLM-2020-5678',
      bank_iban: 'SA0380000000608010167519',
      email: 'testlab@example.com',
      username: 'testlabowner',
      password: hashedPassword,
      date_subscription: new Date(),
      subscription_end: subscriptionEnd,
      subscriptionFee: 150,
      subscription_period_months: 1,
      admin_id: admin._id,
      is_active: true,
      status: 'approved',
      office_hours: [
        { day: 'monday', open_time: '08:00', close_time: '17:00', is_closed: false },
        { day: 'tuesday', open_time: '08:00', close_time: '17:00', is_closed: false },
        { day: 'wednesday', open_time: '08:00', close_time: '17:00', is_closed: false },
        { day: 'thursday', open_time: '08:00', close_time: '17:00', is_closed: false },
        { day: 'friday', open_time: '08:00', close_time: '12:00', is_closed: false },
        { day: 'saturday', open_time: '09:00', close_time: '13:00', is_closed: false },
        { day: 'sunday', open_time: '00:00', close_time: '00:00', is_closed: true }
      ]
    });

    await testOwner.save();
    
    console.log('Test owner created successfully!');
    console.log('=====================================');
    console.log('Login Credentials:');
    console.log('  Username: testlabowner');
    console.log('  Password: Test@123');
    console.log('=====================================');
    console.log('Owner Details:');
    console.log({
      lab_name: testOwner.lab_name,
      email: testOwner.email,
      subscription_end: testOwner.subscription_end,
      days_remaining: Math.ceil((subscriptionEnd - new Date()) / (1000 * 60 * 60 * 24)),
      fee: testOwner.subscriptionFee
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating test owner:', error);
    process.exit(1);
  }
}

createTestOwner();
