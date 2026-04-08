const mongoose = require('mongoose');
const LabOwner = require('./models/Owner');
const Admin = require('./models/Admin');
const Patient = require('./models/Patient');
const Doctor = require('./models/Doctor');
const Staff = require('./models/Staff');
const Notification = require('./models/Notification');
require('dotenv').config();

// Helper function for tiered fee calculation
async function calculateTieredFee(ownerId) {
  const patientCount = await Patient.countDocuments({ owner_id: ownerId });

  // Patient fee
  let patientFee = 0;
  if (patientCount <= 500) patientFee = 50;
  else if (patientCount > 500 && patientCount <= 2000) patientFee = 100;
  else if (patientCount > 2000) patientFee = 200;

  return {
    total: patientFee,
    patientFee,
    patientCount
  };
}

// Connect to database
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

// Create test lab owner with subscription expiring in a few days
async function createTestOwnerExpiring() {
  try {
    // Get the first admin (or create one if none exists)
    let admin = await Admin.findOne();
    if (!admin) {
      console.log('❌ No admin found. Please create an admin first.');
      return;
    }

    // Calculate subscription end date (5 days from now)
    const subscriptionEndDate = new Date();
    subscriptionEndDate.setDate(subscriptionEndDate.getDate() + 5);

    // Calculate subscription start date (30 days ago)
    const subscriptionStartDate = new Date();
    subscriptionStartDate.setDate(subscriptionStartDate.getDate() - 30);

    const labOwnerData = {
      // Basic Information
      name: {
        first: 'Ahmed',
        middle: 'Mohammed',
        last: 'Al-Rashid'
      },
      lab_name: 'Al-Rashid Medical Diagnostics Center',
      lab_license_number: 'LAB-2024-004',
      owner_id: 'OWN-2024-004',

      // Personal Information
      identity_number: '7778889990001',
      birthday: new Date('1982-05-15'),
      gender: 'Male',
      social_status: 'Married',
      phone_number: '+970-598-777-888',
      qualification: 'Master of Science in Clinical Pathology',
      profession_license: 'MLS-2018-0445',

      // Contact Information
      email: 'ahmed.alrashid@rashidlab.com',
      username: 'ahmed.alrashid',
      password: 'TestPass123!',

      // Address
      address: {
        street: '456 Health Street, Ramallah',
        city: 'Ramallah',
        country: 'Palestine'
      },

      // Banking
      bank_iban: 'PS777888999000111222333444555',

      // Subscription
      subscriptionFee: 120,
      subscription_period_months: 1,
      date_subscription: subscriptionStartDate,
      subscription_end: subscriptionEndDate,
      admin_id: admin._id,

      // Status
      status: 'approved',
      is_active: true,

      // Office Hours
      office_hours: [
        {
          day: 'monday',
          open_time: '07:30',
          close_time: '16:30',
          is_closed: false
        },
        {
          day: 'tuesday',
          open_time: '07:30',
          close_time: '16:30',
          is_closed: false
        },
        {
          day: 'wednesday',
          open_time: '07:30',
          close_time: '16:30',
          is_closed: false
        },
        {
          day: 'thursday',
          open_time: '07:30',
          close_time: '16:30',
          is_closed: false
        },
        {
          day: 'friday',
          open_time: '07:30',
          close_time: '14:30',
          is_closed: false
        },
        {
          day: 'saturday',
          open_time: '08:00',
          close_time: '12:00',
          is_closed: false
        },
        {
          day: 'sunday',
          open_time: '00:00',
          close_time: '00:00',
          is_closed: true
        }
      ],

      // FCM Token (optional)
      fcm_token: null,
      platform: null
    };

    // Check if owner already exists
    const existingOwner = await LabOwner.findOne({
      $or: [
        { email: labOwnerData.email },
        { identity_number: labOwnerData.identity_number },
        { username: labOwnerData.username }
      ]
    });

    if (existingOwner) {
      console.log('⚠️ Lab owner already exists:', existingOwner.lab_name);
      console.log('📅 Current subscription end:', existingOwner.subscription_end);

      // Update subscription end date if needed
      if (existingOwner.subscription_end > subscriptionEndDate) {
        existingOwner.subscription_end = subscriptionEndDate;
        await existingOwner.save();
        console.log('✅ Updated subscription end date to:', subscriptionEndDate);
      }

      return existingOwner;
    }

    // Create new lab owner
    const labOwner = new LabOwner(labOwnerData);
    await labOwner.save();

    console.log('✅ Lab owner created successfully!');
    console.log('🏥 Lab Name:', labOwner.lab_name);
    console.log('👤 Owner:', `${labOwner.name.first} ${labOwner.name.last}`);
    console.log('📧 Email:', labOwner.email);
    console.log('📅 Subscription End:', labOwner.subscription_end);
    console.log('📅 Days until expiration:', Math.ceil((labOwner.subscription_end - new Date()) / (1000 * 60 * 60 * 24)));
    console.log('🔑 Username:', labOwner.username);
    console.log('📞 Phone:', labOwner.phone_number);
    console.log('💰 Subscription Fee: $', labOwner.subscriptionFee);
    console.log('📋 License Number:', labOwner.lab_license_number);
    console.log('🏠 Address:', labOwner.address.street);

    return labOwner;

  } catch (error) {
    console.error('❌ Error creating lab owner:', error);
    throw error;
  }
}

// Main execution
async function main() {
  try {
    await connectDB();

    // Create lab owner with expiring subscription
    const labOwner = await createTestOwnerExpiring();

    console.log('\n🎉 Script completed successfully!');
    console.log('📊 Summary:');
    console.log('   - Lab owner created with 5 days until subscription expires');
    console.log('   - Complete owner information included');
    console.log('   - Owner will appear in subscription expiring section');

  } catch (error) {
    console.error('❌ Script failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('📪 Database connection closed');
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { createTestOwnerExpiring };