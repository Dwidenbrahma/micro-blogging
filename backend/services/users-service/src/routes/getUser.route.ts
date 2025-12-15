import { Router, Request, Response } from "express";
import User from "../models/User";

const router = Router();

router.get("/user/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .select("_id username name email")
      .lean();

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({ message: "Success", data: user });
  } catch (err) {
    return res.status(500).json({ message: "Internal error", error: err });
  }
});

export default router;
