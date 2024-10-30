// server/routes/authRoutes.js

import express from 'express';
import User from '../schemas/User.js'

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, id, name, avatar, username } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ id, name, email, avatar, username });
            await user.save();
            return;
        }
        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            username: user.username,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to create or fetch user", error: error.message });
    }
});

router.get('/',async(req,res)=>{
    res.status(200).json({message:"all users"})
})

export default router;
