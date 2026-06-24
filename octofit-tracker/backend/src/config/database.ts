import mongoose from 'mongoose';

export const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db';

export async function connectDatabase(): Promise<void> {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(MONGO_URL);
    console.log('Connected to MongoDB at', MONGO_URL);
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    throw err;
  }
}

export default connectDatabase;
