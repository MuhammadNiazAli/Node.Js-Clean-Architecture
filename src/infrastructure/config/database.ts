import mongoose from 'mongoose';

export default async function connectDatabase() {
  await mongoose.connect(process.env.MONGO_URI as string);

  console.log('MongoDB connected');
}