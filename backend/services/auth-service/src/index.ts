import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import connectDB from "./db";

import authRouter from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);

const PORT = process.env.PORT;
const DATABASE_URI = process.env.DATA_URI;

app.listen(PORT, async () => {
  await connectDB(DATABASE_URI!);
  console.log("Auth service is live at: ", PORT);
});
