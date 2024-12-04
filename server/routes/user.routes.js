// server/routes/authRoutes.js

import express from 'express';
import { checkUsername, getAllUsers, getUser, saveUser, updateUser } from '../controllers/user.controller.js';
 

const router = express.Router();

router.post('/', saveUser);
router.get('/developers/:token', getAllUsers);
router.get('/:username',getUser)
router.post('/check-username/:username',checkUsername)
router.patch('/:id', updateUser);

 

export default router;
