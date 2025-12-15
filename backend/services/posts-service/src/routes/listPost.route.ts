import { Router } from "express";
import PostSchema from "../models/Post";

const router = Router();

router.get("/allPost", async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const skip = (page - 1) * limit;
    const posts = await PostSchema.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

export default router;
