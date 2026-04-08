const mongoose = require('mongoose');
require('dotenv').config();

console.log('🔍 Testing MongoDB Connection...');
console.log('MONGO_URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000,
})
.then(() => {
  console.log('✅ MongoDB Connected Successfully!');
  console.log('Connection Host:', mongoose.connection.host);
  console.log('Database:', mongoose.connection.name);
  process.exit(0);
})
.catch(error => {
  console.error('❌ MongoDB Connection Failed');
  console.error('Error Type:', error.name);
  console.error('Error Message:', error.message);
  
  if (error.name === 'MongoNetworkError') {
    console.error('\n⚠️  Network Error - Possible causes:');
    console.error('  • No internet connection');
    console.error('  • Your IP is not whitelisted in MongoDB Atlas');
    console.error('  • MongoDB URI is incorrect');
  }
  
  process.exit(1);
});
