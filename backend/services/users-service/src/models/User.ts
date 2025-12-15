import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      lowercase: true, // all usernames stored lowercase
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    provider: { type: String, default: "local" }, // local/google/github
    providerId: { type: String }, // For OAuth
  },
  { timestamps: true }
);

UserSchema.index({ username: 1 }); // super fast prefix search

export default model("User", UserSchema);
