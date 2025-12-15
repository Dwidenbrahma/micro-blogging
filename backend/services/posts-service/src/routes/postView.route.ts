import { Router } from "express";
import PostSchema from "../models/Post";
//import auth, { AuthRequest } from "../middleware/auth";

const router = Router();

router.post("/:id/view", async (req, res) => {
  try {
    const post = await PostSchema.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.views += 1;
    await post.save();

    res.json({ views: post.views });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
