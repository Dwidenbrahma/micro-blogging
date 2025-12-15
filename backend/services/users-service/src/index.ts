import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.route";
import connectDB from "./db";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);

app.listen(process.env.PORT, async () => {
  await connectDB(process.env.DATA_URI!);
  console.log("User service is live at", process.env.PORT);
});
