import express from 'express';
import Post from '../schemas/Post.js';
import mongoose from 'mongoose';
const router = express.Router();


router.post("/", async (req, res) => {
    try {
      const { user, title,image } = req.body;
  
      // Validate required fields
      if (!user || !title) {
        return res.status(400).json({ message: "User and title are required" });
      }
  
      
      const newPost = new Post({
        user: new mongoose.Types.ObjectId(user),  
        title,
        image
      });
  
      // Save the post to the database
      const savedPost = await newPost.save();
  
      // Return success response
      res.status(201).json({ message: "Post created successfully", post: savedPost });
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ message: "An error occurred while creating the post", error: error.message });
    }
  });

  export default router;