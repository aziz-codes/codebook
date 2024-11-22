import express from 'express';

 
import { deletePost, getPosts, getSinglePost, post } from '../controllers/post-controllers.js';
import { toggleLikePost } from '../controllers/like-controller.js';
const router = express.Router();


router.post("/", post);
router.get("/", getPosts);
router.delete('/:id',deletePost);
// router.get("/:id", getSinglePost);

router.post("/like/:id",toggleLikePost)

  export default router;