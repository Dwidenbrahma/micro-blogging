import { Router } from "express";
import createUser from "./createUser.route";
import search from "./search.route";
import getUser from "./getUser.route";

const router = Router();

router.use("/", createUser);
router.use("/", search);
router.use("/", getUser);

export default router;
