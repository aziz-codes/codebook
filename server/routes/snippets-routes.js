import express from 'express';
import { allSnippets, saveSnippet } from '../controllers/snippet-controllers.js';


const router = express.Router();

router.get("/",allSnippets);
router.post("/",saveSnippet)


export default router;