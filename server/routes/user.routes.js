// server/routes/authRoutes.js

import express from 'express';
import { getUser, saveUser } from '../controllers/user.controller.js';
 

const router = express.Router();

router.post('/', saveUser);
router.get('/:username',getUser)
 

export default router;
