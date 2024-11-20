import express from 'express';

 
import { getPosts, post } from '../controllers/post-controllers.js';
import { toggleLikePost } from '../controllers/like-controller.js';
const router = express.Router();


router.post("/", post);
router.get("/", getPosts);

router.post("/like/:id",toggleLikePost)

  export default router;