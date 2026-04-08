const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
require('dotenv').config();

const Doctor = require('./models/Doctor');
const Patient = require('./models/Patient');
const Staff = require('./models/Staff');
const Admin = require('./models/Admin');
const Owner = require('./models/Owner');

async function resetPasswords() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    const newPassword = 'StrongPassword123!';
    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    // Update all doctors
    await Doctor.updateMany({}, { password: hashedPassword });
    console.log('✅ All doctors password updated');

    // Update all patients
    await Patient.updateMany({}, { password: hashedPassword });
    console.log('✅ All patients password updated');

    // Update all staff
    await Staff.updateMany({}, { password: hashedPassword });
    console.log('✅ All staff password updated');

    // Update all admins
    await Admin.updateMany({}, { password: hashedPassword });
    console.log('✅ All admins password updated');

    // Update all owners
    await Owner.updateMany({}, { password: hashedPassword });
    console.log('✅ All lab owners password updated');

    console.log('\n✅ All passwords reset to: StrongPassword123!\n');
    console.log('You can now login with any username + StrongPassword123!');
    console.log('\nExisting usernames:');
    console.log('  - doctor1');
    console.log('  - doctor2');
    console.log('  - mohammed (doctor)');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

resetPasswords();
