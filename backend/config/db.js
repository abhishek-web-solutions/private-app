import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.error(error.message);
  }
};
export default connectDB;
