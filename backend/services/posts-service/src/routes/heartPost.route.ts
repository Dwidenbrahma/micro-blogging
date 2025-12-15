import { Router } from "express";
import PostSchema from "../models/Post";
import auth, { AuthRequest } from "../middleware/auth";

const router = Router();
router.post("/:id/like", auth, async (req: AuthRequest, res) => {
  try {
    const userId = req.userId!;
    const post = await PostSchema.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // ❌ Already liked
    if (post.likedBy.includes(userId)) {
      return res.status(400).json({
        message: "You already liked this post",
        hearts: post.hearts,
      });
    }

    // ✅ Like
    post.likedBy.push(userId);
    post.hearts += 1;
    await post.save();

    res.json({
      message: "Post liked",
      hearts: post.hearts,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
