import { Router } from "express";
import User from "../models/User";

const router = Router();

router.get("/search", async (req, res) => {
  try {
    const query = (req.query.query as string).toLowerCase();
    if (!query) {
      return res.status(400).json({ message: "Missing query" });
    }
    const results = await User.find({
      username: { $regex: "^" + query },
    })
      .limit(10)
      .lean();

    return res.status(200).json({ messsge: "Success", data: results });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

export default router;
