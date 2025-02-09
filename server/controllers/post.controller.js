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
    const posts = await Post.aggregate([
      { $sort: { createdAt: -1 } }, // Sort by latest

      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },

      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "post",
          as: "comments",
        },
      },

      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "post",
          as: "likes",
        },
      },

      {
        $lookup: {
          from: "bookmarks",
          localField: "_id",
          foreignField: "postId",
          as: "bookmarks",
        },
      },

      {
        $addFields: {
          commentCount: { $size: "$comments" },
          likes: {
            userIds: {
              $map: {
                input: "$likes",
                as: "like",
                in: "$$like.user", // Extracting user IDs
              },
            },
          },
          bookmarkUserIds: {
            $map: {
              input: "$bookmarks",
              as: "bookmark",
              in: "$$bookmark.userId",
            },
          },
        },
      },

      {
        $project: {
          "likes._id": 0,
          "likes.post": 0,
          "likes.__v": 0,
          "likes.createdAt": 0,
          "likes.updatedAt": 0,
          bookmarks: 0,
          comments: 0, // Exclude full comments
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await Post.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },

      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },

      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "post",
          as: "comments",
        },
      },

      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "post",
          as: "likes",
        },
      },

      {
        $lookup: {
          from: "bookmarks",
          localField: "_id",
          foreignField: "postId",
          as: "bookmarks",
        },
      },

      {
        $addFields: {
          commentCount: { $size: "$comments" },
          likes: {
            userIds: {
              $map: {
                input: "$likes",
                as: "like",
                in: "$$like.user",
              },
            },
          },
          bookmarkUserIds: {
            $map: {
              input: "$bookmarks",
              as: "bookmark",
              in: "$$bookmark.userId",
            },
          },
        },
      },

      {
        $project: {
          "likes._id": 0,
          "likes.post": 0,
          "likes.__v": 0,
          "likes.createdAt": 0,
          "likes.updatedAt": 0,
          bookmarks: 0,
          comments: 0,
        },
      },
    ]);

    if (!post.length) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ count: 1, result: [post[0]] });
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
