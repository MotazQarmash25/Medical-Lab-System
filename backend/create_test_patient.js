const mongoose = require('mongoose');
const Patient = require('./models/Patient');
require('dotenv').config();

async function createTestPatient() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Check if test patient already exists
    const existingPatient = await Patient.findOne({ username: 'test.patient' });
    if (existingPatient) {
      console.log('Test patient already exists');
      return;
    }

    // Create test patient
    const testPatient = new Patient({
      full_name: {
        first: 'Test',
        last: 'Patient'
      },
      identity_number: '123456789',
      birthday: new Date('1990-01-01'),
      gender: 'Male',
      phone_number: '+972501234567',
      email: 'test.patient@example.com',
      username: 'test.patient',
      password: 'password123', // This will be hashed by the pre-save middleware
      address: {
        street: 'Test Street',
        city: 'Test City',
        state: 'Test State',
        zip_code: '12345',
        country: 'Israel'
      }
    });

    await testPatient.save();
    console.log('Test patient created successfully');

  } catch (error) {
    console.error('Error creating test patient:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

createTestPatient();