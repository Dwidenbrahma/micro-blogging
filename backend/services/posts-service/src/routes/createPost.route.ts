import { Router, Response } from "express";
import PostSchema from "../models/Post";
import auth, { AuthRequest } from "../middleware/auth";

const router = Router();

router.post("/create-post", auth, async (req: AuthRequest, res: Response) => {
  const { title, body, tags, type } = req.body;

  try {
    const post = await PostSchema.create({
      authorId: req.userId,
      authorName: req.username || "anonymous", // ✅ no red line now
      title,
      body,
      tags,
      type,
    });

    res.status(201).json({ message: "Success", data: post });
  } catch (err) {
    console.error("Internal Server Error", err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

export default router;
