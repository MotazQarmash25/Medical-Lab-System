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

// Create renewal request for the lab owner
async function createRenewalRequest(labOwner, admin) {
  try {
    // Check if renewal request already exists
    const existingRequest = await Notification.findOne({
      sender_id: labOwner._id,
      sender_model: 'Owner',
      receiver_model: 'Admin',
      type: 'renewal_request',
      is_read: false
    });

    if (existingRequest) {
      console.log('⚠️ Renewal request already exists for this owner');
      return existingRequest;
    }

    // Calculate renewal fee
    const feeCalculation = await calculateTieredFee(labOwner._id);
    const renewalFee = feeCalculation.total;
    const renewalPeriodMonths = 3; // Request 3 months renewal

    // Create renewal request notification
    const notification = await Notification.create({
      sender_id: labOwner._id,
      sender_model: 'Owner',
      receiver_model: 'Admin',
      type: 'renewal_request',
      title: 'Subscription Renewal Request',
      message: `${labOwner.lab_name} requests subscription renewal for ${renewalPeriodMonths} month(s). Fee: $${renewalFee}. Requesting extension due to expiring subscription.`,
      related_id: labOwner._id,
      metadata: {
        renewal_period_months: renewalPeriodMonths,
        renewal_fee: renewalFee,
        current_end_date: labOwner.subscription_end,
        proposed_end_date: new Date(Date.now() + renewalPeriodMonths * 30 * 24 * 60 * 60 * 1000) // Approximate
      }
    });

    console.log('✅ Renewal request created successfully!');
    console.log('📋 Request ID:', notification._id);
    console.log('⏰ Requested months:', renewalPeriodMonths);
    console.log('💰 Renewal fee: $', renewalFee);

    return notification;

  } catch (error) {
    console.error('❌ Error creating renewal request:', error);
    throw error;
  }
}

// Create test lab owner with expiring subscription
async function createExpiringLabOwner() {
  try {
    // Get the first admin (or create one if none exists)
    let admin = await Admin.findOne();
    if (!admin) {
      console.log('❌ No admin found. Please create an admin first.');
      return;
    }

    // Calculate subscription end date (3 days from now)
    const subscriptionEndDate = new Date();
    subscriptionEndDate.setDate(subscriptionEndDate.getDate() + 3);

    // Calculate subscription start date (30 days ago)
    const subscriptionStartDate = new Date();
    subscriptionStartDate.setDate(subscriptionStartDate.getDate() - 30);

    const labOwnerData = {
      // Basic Information
      name: {
        first: 'Omar',
        middle: 'Hassan',
        last: 'Al-Khalidi'
      },
      lab_name: 'Al-Khalidi Clinical Laboratory',
      lab_license_number: 'LAB-2024-003',
      owner_id: 'OWN-2024-003',

      // Personal Information
      identity_number: '5556667778889',
      birthday: new Date('1978-11-10'),
      gender: 'Male',
      social_status: 'Married',
      phone_number: '+970-597-555-666',
      qualification: 'PhD in Medical Laboratory Science',
      profession_license: 'MLS-2015-0334',

      // Contact Information
      email: 'omar.alkhalidi@khalidilab.com',
      username: 'omar.alkhalidi',
      password: 'TestPass123!',

      // Address
      address: {
        street: '789 Science Boulevard, Hebron',
        city: 'Hebron',
        country: 'Palestine'
      },

      // Banking
      bank_iban: 'PS555666777888999000111222333',

      // Subscription
      subscriptionFee: 150,
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
          open_time: '08:00',
          close_time: '17:00',
          is_closed: false
        },
        {
          day: 'tuesday',
          open_time: '08:00',
          close_time: '17:00',
          is_closed: false
        },
        {
          day: 'wednesday',
          open_time: '08:00',
          close_time: '17:00',
          is_closed: false
        },
        {
          day: 'thursday',
          open_time: '08:00',
          close_time: '17:00',
          is_closed: false
        },
        {
          day: 'friday',
          open_time: '08:00',
          close_time: '15:00',
          is_closed: false
        },
        {
          day: 'saturday',
          open_time: '09:00',
          close_time: '13:00',
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
    const labOwner = await createExpiringLabOwner();

    console.log('\n🎉 Script completed successfully!');
    console.log('📊 Summary:');
    console.log('   - Lab owner created with 3 days until subscription expires');
    console.log('   - NO renewal request created (as requested)');
    console.log('   - Owner will appear in "Expiring" section only');

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

module.exports = { createExpiringLabOwner };