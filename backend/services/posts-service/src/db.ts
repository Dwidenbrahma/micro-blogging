import mongoose from "mongoose";

const connectDB = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    console.log("Posts DB connected");
  } catch (err) {
    console.error("Posts DB error", err);
    process.exit(1);
  }
};

export default connectDB;
