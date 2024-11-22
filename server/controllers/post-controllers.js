import Post from "../schemas/Post.js";
import mongoose from "mongoose";
import Like from '../schemas/Like.js';
import Comment from '../schemas/Comment.js'
export const post = async (req, res) => {
  try {
    const { user, title, image } = req.body;

    if (!user || !title) {
      return res.status(400).json({ message: "User and title are required" });
    }

    const newPost = new Post({
      user: new mongoose.Types.ObjectId(user),
      title,
      image,
    });

    const savedPost = await newPost.save();

    res
      .status(201)
      .json({ message: "Post created successfully", post: savedPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res
      .status(500)
      .json({
        message: "An error occurred while creating the post",
        error: error.message,
      });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username avatar name")
      .sort({ createdAt: -1 })
      .lean(); // Use lean for better performance if no virtuals are needed

    // Attach counts for likes and comments
    const enrichedPosts = await Promise.all(
      posts.map(async (post) => {

        const commentCount = await Comment.countDocuments({ post: post._id });

        // Get the users who liked the post
        const likedUsers = await Like.find({ post: post._id }).select("user");

        return {
          ...post,
          likes: {
            userIds: likedUsers.map(like => like.user), // List of userIds who liked the post
            count: likedUsers.length,  // Total like count
          },
          commentCount,
        };
      })
    );

    res.status(200).json({ count: enrichedPosts.length, result: enrichedPosts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Could not fetch posts." });
  }
};

 

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params; // Extract the post ID from the URL params

    console.log("Post ID to delete:", id);

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    // Find and delete the post by ID
    const post = await Post.findByIdAndDelete(id);
    console.log("Deleted Post:", post); // Log the result to verify it's being deleted

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // If deletion is successful
    res.status(204).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Could not delete post." });
  }
};



export const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;

    console.log('post id is ' + id);

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    // Find the post by ID
    const post = await Post.findById(id);

    // If no post found
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Send the post data
    res.status(200).json({ post });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Could not fetch post." });
  }
};