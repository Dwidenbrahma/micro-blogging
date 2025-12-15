import axios from "axios";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import AuthUser from "../models/AuthUser";

const USER_SERVICE = process.env.USER_SERVICE!;
const JWT_SECRET = process.env.JWT_SECRET!;
console.log("AUTH JWT_SECRET:", process.env.JWT_SECRET);

console.log("User-service url:", USER_SERVICE);

const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, name, password } = req.body;
    if (!username || !email || !name || !password) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const exists = await AuthUser.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "Email already registered" });
    }
    const hash = await bcrypt.hash(password, 10);
    const url = `${USER_SERVICE}/users/create-user`;
    console.log(url);
    const userResponse = await axios.post(url, {
      username,
      email,
      name,
      provider: "local",
    });

    const user = userResponse.data.user;
    console.log(user);

    await AuthUser.create({
      userId: user._id,
      email,
      passwordHash: hash,
    });

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
        algorithm: "HS256",
      }
    );

    return res
      .status(201)
      .json({ message: "Registration success", token, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const authUser = await AuthUser.findOne({ email });

    if (!authUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, authUser.passwordHash);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const userResponse = await axios.get(
      `${USER_SERVICE}/users/user/${authUser.userId}`
    );
    const user = userResponse.data.data; // users-service returns { message, data: user }
    const token = jwt.sign(
      { userId: authUser.userId, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "7d",
        algorithm: "HS256",
      }
    );

    return res.status(200).json({
      message: "Login success",
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

export { loginUser, registerUser };
