import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./db";
import cors from "cors";
import postsRoutes from "./routes/posts.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/posts", postsRoutes);

app.get("/", (req, res) => {
  res.json({ service: "posts" });
});

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  await connectDB(process.env.DATA_URI!);
  console.log("Posts service running on port", PORT);
});
