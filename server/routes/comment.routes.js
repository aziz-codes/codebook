import express from 'express';
import { getComments, saveComment } from '../controllers/comment.controller.js';


const router = express.Router();



router.post("/:postid",saveComment)
router.get("/:postid",getComments)


export default router;