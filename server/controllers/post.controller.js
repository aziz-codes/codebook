import Post from "../schemas/Post.js";
import Like from "../schemas/Like.js";
import Comment from "../schemas/Comment.js";
import mongoose from "mongoose";

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
    res.status(500).json({
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
            userIds: {
              $reduce: {
                input: { $concatArrays: "$likes.userIds" }, // Flatten userIds arrays from all like objects
                initialValue: [], // Start with an empty array
                in: { $setUnion: ["$$value", "$$this"] }, // Ensure uniqueness of userIds
              },
            },
          },
        },
      },
      {
        $project: {
          "likes.count": 0, // Optionally remove the count field
          "likes._id": 0, // Optionally remove the _id field
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

 
    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    // Find and delete the post
    const post = await Post.findByIdAndDelete(id);
    

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Delete associated likes and comments
    const likeDeletionResult = await Like.deleteMany({ post: id });
 

    const commentDeletionResult = await Comment.deleteMany({ post: id });
    

    res
      .status(200)
      .json({ message: "Post and associated data deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Could not delete post." });
  }
};

export const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;

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

export const getPostLikes = async (req, res) => {
  const { id } = req.params; // Get the post ID from the request params

  if (!id) {
    return res.status(400).json({ error: "Post ID is required" });
  }

  try {
    // Use aggregation to find likes and populate user details
    const likes = await Like.aggregate([
      {
        $match: { post: new mongoose.Types.ObjectId(id) }, // Match likes for the specific post
      },
      {
        $lookup: {
          from: "users", // Lookup users collection
          localField: "user", // Match the 'user' field in Like model
          foreignField: "_id", // Match it to the '_id' field in User model
          as: "userDetails", // Output the joined data as 'userDetails'
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          "userDetails.avatar": 1, // Include avatar
          "userDetails.username": 1, // Include username
          "userDetails._id": 1,
          _id: 0, // Exclude _id from the result
        },
      },
    ]);

    if (likes.length === 0) {
      return res.status(404).json({ error: "No likes found for this post" });
    }
    const reformattedLikes = likes.map((like) => ({
      avatar: like.userDetails.avatar,
      id: like.userDetails._id,
      username: like.userDetails.username,
    }));

    return res.status(200).json({ success: true, likes: reformattedLikes });
  } catch (error) {
    console.error("Error fetching post likes:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
