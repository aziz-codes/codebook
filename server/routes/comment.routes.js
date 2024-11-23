import express from 'express';
import { getComments, saveComment } from '../controllers/comment.controller.js';


const router = express.Router();



router.post("/",saveComment)
router.get("/",getComments)


export default router;