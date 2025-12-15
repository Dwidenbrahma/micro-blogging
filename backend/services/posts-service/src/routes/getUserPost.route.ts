import PostSchema from "../models/Post";
import mongoose from "mongoose";
import { Router, Response } from "express";
import auth, { AuthRequest } from "../middleware/auth";

const router = Router();

router.get("/my-post/:id", auth, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const post = await PostSchema.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // 🔐 Ownership check
    if (post.authorId !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // ❌ NO view increment here
    res.status(200).json({
      message: "Success",
      data: post,
    });
  } catch (err) {
    console.error("Get my post error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
