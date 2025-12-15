import { Router, Response } from "express";
import PostSchema from "../models/Post";
import auth, { AuthRequest } from "../middleware/auth";

const router = Router();

// 📌 Get posts created by logged-in user
router.get("/my-posts", auth, async (req: AuthRequest, res: Response) => {
  try {
    const posts = await PostSchema.find({
      authorId: req.userId,
    }).sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    console.error("My posts error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
