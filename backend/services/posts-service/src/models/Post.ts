import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    authorId: {
      type: String,
      required: true,
      index: true,
    },
    authorName: {
      type: String,
      default: "anonymous",
    },
    title: {
      type: String,
      required: true,
    },

    body: {
      type: String,
      required: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    type: {
      type: String,
      enum: ["blog", "article"],
      default: "blog",
    },

    views: {
      type: Number,
      default: 0,
    },

    hearts: {
      type: Number,
      default: 0,
    },
    likedBy: {
      type: [String], // userIds
      default: [],
    },
    viewedBy: {
      type: [String], // userIds or anon ids
      default: [],
    },
  },
  { timestamps: true }
);

export default model("Post", postSchema);
