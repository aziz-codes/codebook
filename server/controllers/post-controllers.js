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
    // Aggregation pipeline to fetch posts with enriched data
    const posts = await Post.aggregate([
      { $sort: { createdAt: -1 } }, // Sort by creation date
      {
        $lookup: {
          from: "users", // Join with the "users" collection
          localField: "user", // Match the "user" field in the Post model
          foreignField: "_id", // With the "_id" field in the User model
          as: "user", // Output the result into this field
        },
      },
      { $unwind: "$user" }, // Flatten the userDetails array
      {
        $lookup: {
          from: "comments", // Join with the "comments" collection
          localField: "_id", // Match the "post" field in Comments
          foreignField: "post",
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "likes", // Join with the "likes" collection
          localField: "_id", // Match the "post" field in Likes
          foreignField: "post",
          as: "likes",
        },
      },
      {
        $addFields: {
          commentCount: { $size: "$comments" }, // Count the number of comments
          likes: {
            userIds: { $reduce: {
              input: { $concatArrays: "$likes.userIds" }, // Flatten userIds arrays from all like objects
              initialValue: [], // Start with an empty array
              in: { $setUnion: ["$$value", "$$this"] } // Ensure uniqueness of userIds
            }},
          },
        },
      },
      {
        $project: {
          "likes.count": 0, // Optionally remove the count field
          "likes._id": 0,  // Optionally remove the _id field
          "likes.createdAt": 0, // Optionally remove the createdAt field
          "likes.updatedAt": 0, // Optionally remove the updatedAt field
        },
      },
    ]);

    res.status(200).json({ count: posts.length, result: posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Could not fetch posts." });
  }
};



 

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;  

    console.log("Post ID to delete:", id);

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

 
    const post = await Post.findByIdAndDelete(id);
    console.log("Deleted Post:", post);  

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    
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