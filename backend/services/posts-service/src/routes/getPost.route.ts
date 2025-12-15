import { Router } from "express";
import PostSchema from "../models/Post";
import mongoose from "mongoose";

const router = Router();

router.get("/get-post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const post = await PostSchema.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json({ message: "Success", data: post });
  } catch (err) {}
});

export default router;
