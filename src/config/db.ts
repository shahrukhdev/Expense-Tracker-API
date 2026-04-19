import mongoose from 'mongoose';
import env from './env.js';

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(env.DB_URI);

    console.log(`MongoDB connected: ${conn.connection.host}`);

  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;