import Comment from "../schemas/Comment.js"
import mongoose from "mongoose";

export const saveComment = async (req, res) => {
  try {
    const { user,  text } = req.body;
    const {postid:post} = req.params;

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
  try {
    const { postid:postId } = req.params;

    const comments = await Comment.aggregate([
      { $match: { post: new mongoose.Types.ObjectId(postId) } }, // Filter by post ID
      {
        $lookup: {
          from: "users", // Join with the "users" collection
          localField: "user", // `user` in Comment schema
          foreignField: "_id", // `_id` in User schema
          as: "userDetails", // Name the result array
        },
      },
      { $unwind: "$userDetails" }, // Flatten the userDetails array
      {
        $project: {
          _id: 1,
          post: 1,
          text: 1,
          createdAt: 1,
          "userDetails.username": 1,
          "userDetails.avatar": 1,
        },
      },
      { $sort: { createdAt: -1 } }, // Sort by creation date (most recent first)
    ]);

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Could not fetch comments." });
  }
}