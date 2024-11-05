import express from 'express';

 
import { getPosts, post } from '../controllers/post-controllers.js';
const router = express.Router();


router.post("/", post);
router.get("/", getPosts);

  export default router;