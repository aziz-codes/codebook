import express from 'express';
import { deleteComment, getComments, saveComment } from '../controllers/comment.controller.js';


const router = express.Router();



router.post("/:postid",saveComment);
router.get("/:postid",getComments);
router.delete("/:postid",deleteComment);


export default router;