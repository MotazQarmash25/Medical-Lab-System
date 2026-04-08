const mongoose = require('mongoose');
require('dotenv').config();

// Import Doctor model
const Doctor = require('./models/Doctor');

async function checkDoctors() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const doctors = await Doctor.find({}, { username: 1, email: 1, fullName: 1, _id: 0 });
    
    console.log('📋 All Doctors in Database:');
    console.log('================================');
    doctors.forEach((doc, index) => {
      console.log(`${index + 1}. Username: ${doc.username}`);
      console.log(`   Email: ${doc.email}`);
      console.log(`   Name: ${doc.fullName}`);
      console.log('');
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkDoctors();
