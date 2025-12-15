import { Router } from "express";
import User from "../models/User";

const router = Router();

router.post("/create-user", async (req, res) => {
  try {
    const { username, email, name } = req.body;
    if (!username || !email || !name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(409).json({ message: "Username already taken" });
    }
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const newUser = await User.create({
      username,
      email,
      name,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

export default router;
