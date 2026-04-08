const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
require('dotenv').config();

// Import models
const Admin = require('./models/Admin');
const Doctor = require('./models/Doctor');
const Staff = require('./models/Staff');
const Patient = require('./models/Patient');
const Owner = require('./models/Owner');

async function createTestUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    // Hash passwords
    const hashedPassword = await bcryptjs.hash('StrongPassword123!', 10);

    // 1. Create Admin
    const adminExists = await Admin.findOne({ username: 'abdalrahman' });
    if (!adminExists) {
      const admin = new Admin({
        username: 'abdalrahman',
        email: 'admin@medicallab.com',
        password: hashedPassword,
        fullName: 'Abdalrahman Admin',
        role: 'admin'
      });
      await admin.save();
      console.log('✅ Admin created: abdalrahman / StrongPassword123!');
    } else {
      console.log('⚠️  Admin already exists');
    }

    // 2. Create Doctor
    const doctorExists = await Doctor.findOne({ username: 'doctor1' });
    if (!doctorExists) {
      const doctor = new Doctor({
        username: 'doctor1',
        email: 'doctor@medicallab.com',
        password: hashedPassword,
        fullName: 'Dr. Ahmed Hassan',
        specialization: 'General Medicine',
        licenseNumber: 'LIC123456',
        phone: '+201001234567'
      });
      await doctor.save();
      console.log('✅ Doctor created: doctor1 / StrongPassword123!');
    } else {
      console.log('⚠️  Doctor already exists');
    }

    // 3. Create Staff
    const staffExists = await Staff.findOne({ username: 'staff1' });
    if (!staffExists) {
      const staff = new Staff({
        username: 'staff1',
        email: 'staff@medicallab.com',
        password: hashedPassword,
        fullName: 'Mohammed Staff',
        phone: '+201001234568',
        position: 'Lab Technician'
      });
      await staff.save();
      console.log('✅ Staff created: staff1 / StrongPassword123!');
    } else {
      console.log('⚠️  Staff already exists');
    }

    // 4. Create Patient
    const patientExists = await Patient.findOne({ username: 'patient1' });
    if (!patientExists) {
      const patient = new Patient({
        username: 'patient1',
        email: 'patient@medicallab.com',
        password: hashedPassword,
        fullName: 'Fatima Patient',
        phone: '+201001234569',
        dateOfBirth: new Date('1990-05-15'),
        gender: 'Female',
        medicalHistory: 'No known allergies'
      });
      await patient.save();
      console.log('✅ Patient created: patient1 / StrongPassword123!');
    } else {
      console.log('⚠️  Patient already exists');
    }

    // 5. Create Lab Owner
    const ownerExists = await Owner.findOne({ username: 'owner1' });
    if (!ownerExists) {
      const owner = new Owner({
        username: 'owner1',
        email: 'owner@medicallab.com',
        password: hashedPassword,
        labName: 'Premium Medical Laboratory',
        ownerName: 'Ibrahim Owner',
        phone: '+201001234570',
        licenseNumber: 'LAB123456',
        subscriptionPlan: 'premium',
        isActive: true,
        maxPatients: 2000
      });
      await owner.save();
      console.log('✅ Lab Owner created: owner1 / StrongPassword123!');
    } else {
      console.log('⚠️  Lab Owner already exists');
    }

    console.log('\n✅ All test users created successfully!\n');
    console.log('Test Credentials:');
    console.log('================');
    console.log('Admin:       abdalrahman / StrongPassword123!');
    console.log('Doctor:      doctor1 / StrongPassword123!');
    console.log('Staff:       staff1 / StrongPassword123!');
    console.log('Patient:     patient1 / StrongPassword123!');
    console.log('Lab Owner:   owner1 / StrongPassword123!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createTestUsers();
