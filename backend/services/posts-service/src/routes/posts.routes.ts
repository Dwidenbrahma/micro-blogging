import { Router } from "express";
import listPosts from "./listPost.route";
import getPost from "./getPost.route";
import createPost from "./createPost.route";
import updatePost from "./updatePost.route";
import deletePost from "./deletePost.route";
import heartPost from "./heartPost.route";
import postView from "./postView.route";
import userDash from "./userDash.route";
import getUserPost from "./getUserPost.route";

const router = Router();

router.use("/", listPosts);
router.use("/", createPost);
router.use("/", getPost);
router.use("/", updatePost);
router.use("/", deletePost);
router.use("/", heartPost);
router.use("/", postView);
router.use("/", userDash);
router.use("/", getUserPost);
export default router;
