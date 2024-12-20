import Comment from "../schemas/Comment.js"
import Post from "../schemas/Post.js";
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
          likes: 1,
          createdAt: 1,
          "userDetails.username": 1,
          "userDetails.avatar": 1,
          "userDetails._id": 1,
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

export const deleteComment = async (req, res) => {
  try {
    const { postid:postId } = req.params;  // Post ID from the URL
    const { commentid:commentId } = req.body;  // Comment ID from the request body

    // Step 1: Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Step 2: Check if the comment exists and belongs to the post
    const comment = await Comment.findOne({ _id: commentId, post });
    if (!comment) {
      return res.status(404).json({ message: "Comment not found or does not belong to this post" });
    }

    // Step 3: Delete the comment
    await Comment.deleteOne({ _id: commentId });

    // Step 4: Return success response
    res.status(200).json({ message: "Comment deleted successfully" });

  } catch (e) {
    console.log("Error:", e);
    res.status(500).json({ message: "An error occurred while deleting the comment" });
  }
};
export const handleCommentReact = async (req, res) => {
  try {
    const { commentid } = req.params; // Extract comment ID from the params
    const { userid: userId } = req.body; // Extract user ID from the request body

    // Find the comment
    const comment = await Comment.findById(commentid);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the user has already liked the comment
    const alreadyLiked = comment.likes.includes(userId);

    if (alreadyLiked) {
      // If the user has already liked the comment, remove their like (dislike)
      comment.likes = comment.likes.filter((id) => id.toString() !== userId);
    } else {
      // If the user has not liked the comment, add their like
      comment.likes.push(userId);
    }

    // Save the updated comment
    await comment.save();

    res.status(200).json({
      message: alreadyLiked ? "Comment disliked" : "Comment liked",
      likesCount: comment.likes.length, // Return the updated likes count
    });
  } catch (error) {
    console.error("Error handling comment react:", error);
    res.status(500).json({ error: "An error occurred while processing the request." });
  }
};