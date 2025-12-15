import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!.trim();
console.log("Post Service Secret Length:", JWT_SECRET.length);
console.log(
  "Post Service Secret First/Last char:",
  JWT_SECRET[0],
  JWT_SECRET[JWT_SECRET.length - 1]
);

if (!JWT_SECRET) throw new Error("JWT_SECRET missing");

export interface AuthRequest extends Request {
  userId?: string;
  username?: string;
}

const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.replace("Bearer ", "").trim();

    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    }) as { userId: string; username: string };

    console.log(decoded);
    req.userId = decoded.userId;
    req.username = decoded.username;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;
