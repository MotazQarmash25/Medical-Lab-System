const mongoose = require('mongoose');
require('dotenv').config();

const Doctor = require('./models/Doctor');

async function checkDoctorData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const doctor = await Doctor.findOne({ username: 'doctor1' });
    
    if (!doctor) {
      console.log('❌ No doctor with username "doctor1" found');
      
      console.log('\nAll doctors in database:');
      const allDoctors = await Doctor.find({});
      allDoctors.forEach((d, i) => {
        console.log(`${i + 1}. {`);
        console.log(`   _id: ${d._id}`);
        console.log(`   username: ${d.username}`);
        console.log(`   password: ${d.password ? d.password.substring(0, 20) + '...' : 'NO PASSWORD'}`);
        console.log(`}`);
      });
    } else {
      console.log('✅ Found doctor1:');
      console.log(`   _id: ${doctor._id}`);
      console.log(`   username: ${doctor.username}`);
      console.log(`   password hash: ${doctor.password.substring(0, 30)}...`);
      console.log(`   password length: ${doctor.password.length}`);
      
      // Test password
      console.log('\nTesting password comparison...');
      const isMatch = await doctor.comparePassword('StrongPassword123!');
      console.log(`   comparePassword('StrongPassword123!'): ${isMatch}`);
      
      if (!isMatch) {
        console.log('\n❌ Password mismatch! Testing other passwords...');
        const testPasswords = ['strong', 'password123', 'doctor1', 'test'];
        for (let pwd of testPasswords) {
          const result = await doctor.comparePassword(pwd);
          console.log(`   comparePassword('${pwd}'): ${result}`);
        }
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkDoctorData();
