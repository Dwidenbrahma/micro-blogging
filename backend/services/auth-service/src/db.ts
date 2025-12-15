import mongoose from "mongoose";

const connectDB = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    console.log("Auth Service DB connected");
  } catch (err) {
    console.log("DB error", err);
  }
};

export default connectDB;
