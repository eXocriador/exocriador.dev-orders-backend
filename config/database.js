const mongoose = require('mongoose');
const { getEnvVar } = require('../utils/env');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(getEnvVar('MONGODB_URI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('🔴 MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
