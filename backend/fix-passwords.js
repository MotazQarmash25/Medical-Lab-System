const mongoose = require('mongoose');
require('dotenv').config();

const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');
const Staff = require('./models/Staff');
const Admin = require('./models/Admin');
const Owner = require('./models/Owner');

async function fixPasswords() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const newPassword = 'StrongPassword123!';

    console.log('Updating doctors...');
    const doctors = await Doctor.find({});
    for (let doc of doctors) {
      doc.password = newPassword;
      await doc.save();
    }
    console.log(`✅ Updated ${doctors.length} doctors`);

    console.log('Updating patients...');
    const patients = await Patient.find({});
    for (let patient of patients) {
      patient.password = newPassword;
      await patient.save();
    }
    console.log(`✅ Updated ${patients.length} patients`);

    console.log('Updating staff...');
    const staffs = await Staff.find({});
    for (let staff of staffs) {
      staff.password = newPassword;
      await staff.save();
    }
    console.log(`✅ Updated ${staffs.length} staff`);

    console.log('Updating admins...');
    const admins = await Admin.find({});
    for (let admin of admins) {
      admin.password = newPassword;
      await admin.save();
    }
    console.log(`✅ Updated ${admins.length} admins`);

    console.log('Updating lab owners...');
    const owners = await Owner.find({});
    for (let owner of owners) {
      owner.password = newPassword;
      await owner.save();
    }
    console.log(`✅ Updated ${owners.length} lab owners`);

    console.log('\n✅ All passwords properly hashed to: StrongPassword123!\n');
    
    // Show some usernames
    const doctorsList = await Doctor.find({}, { username: 1 });
    console.log('Doctor usernames:');
    doctorsList.slice(0, 3).forEach(d => console.log(`  - ${d.username}`));

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

fixPasswords();
