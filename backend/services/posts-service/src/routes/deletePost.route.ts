import { Router, Response } from "express";
import mongoose from "mongoose";
import PostSchema from "../models/Post";
import auth, { AuthRequest } from "../middleware/auth";

const router = Router();

router.delete("/:id", auth, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const deletedPost = await PostSchema.findOneAndDelete({
      _id: id,
      authorId: req.userId, // ✅ now TS is happy
    });

    if (!deletedPost) {
      return res.status(403).json({
        message: "Not authorized or post not found",
      });
    }

    return res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default router;
