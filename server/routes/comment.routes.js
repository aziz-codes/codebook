import express from "express";
import {
  deleteComment,
  getCommentReplies,
  getComments,
  handleCommentReact,
  saveComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/:postid", saveComment);
router.get("/:postid", getComments);
router.delete("/:postid", deleteComment);
router.post("/react/:commentid", handleCommentReact);
router.get("/replies/:commentId", getCommentReplies);

export default router;
