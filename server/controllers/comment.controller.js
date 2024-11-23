import Comment from "../schemas/Comment.js"
import mongoose from "mongoose";

export const saveComment = async (req, res) => {
  try {
    const { user, post, text } = req.body;

    // Validate required fields
    if (!user || !post || !text) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Ensure valid ObjectId for user and post
    if (!mongoose.Types.ObjectId.isValid(user) || !mongoose.Types.ObjectId.isValid(post)) {
      return res.status(400).json({ message: "Invalid user or post ID." });
    }

    // Create a new comment
    const newComment = new Comment({
      user,
      post,
      text,
    });

    // Save the comment to the database
    await newComment.save();

    return res.status(201).json({
      message: "Comment saved successfully.",
      comment: newComment,
    });
  } catch (error) {
    console.error("Error saving comment:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};


export const getComments = async(req,res)=>{
 return  res.status(200).json({message:'api success'});
}