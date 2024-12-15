import mongoose from 'mongoose';

const connectDatabase = async (): Promise<void> => {
  try {
    const dbUri = process.env.DB_URI!;
    await mongoose.connect(dbUri);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  } 
};

export default connectDatabase;
