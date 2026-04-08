const mongoose = require('mongoose');
require('dotenv').config();

console.log('🔍 Checking MongoDB Connection & Database Content...\n');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('✅ Connected to MongoDB');
    console.log(`📊 Database: ${mongoose.connection.name}`);
    console.log(`🖥️  Host: ${mongoose.connection.host}\n`);

    // Get all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📋 Collections in database:');
    console.log('--------------------------------');
    
    for (const collection of collections) {
      const count = await mongoose.connection.db.collection(collection.name).countDocuments();
      console.log(`  • ${collection.name}: ${count} documents`);
    }

    console.log('--------------------------------\n');
    console.log('✅ Database connection verified!\n');
    
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  });
