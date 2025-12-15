import { Schema, model } from "mongoose";

const AuthUserSchema = new Schema(
  {
    userId: { type: String, required: true },
    username: { type: String, require: true }, // from User Service
    email: { type: String, unique: true, required: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("AuthUser", AuthUserSchema);
