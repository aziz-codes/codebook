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


