import express from 'express';

 
import { deletePost, getPostLikes, getPosts, post } from '../controllers/post.controller.js';
import { toggleLikePost } from '../controllers/like.controller.js';
const router = express.Router();


router.post("/", post);
router.get("/", getPosts);
router.delete('/:id',deletePost);

router.post("/like/:id",toggleLikePost)

router.get("/likes/:id",getPostLikes)



  export default router;