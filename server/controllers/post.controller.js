import Post from "../schemas/Post.js";
import Like from "../schemas/Like.js";

import mongoose from "mongoose";

export const post = async (req, res) => {
  try {
    const { user, title, images } = req.body;

    if (!user || !title) {
      return res.status(400).json({ message: "User and title are required" });
    }

    const newPost = new Post({
      user: new mongoose.Types.ObjectId(user),
      title,
      images,
    });

    const savedPost = await newPost.save();

    res
      .status(201)
      .json({ message: "Post created successfully", post: savedPost._id });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({
      message: "An error occurred while creating the post",
      error: error.message,
    });
  }
};

//get all post controller.
export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const blockedUsers = (req.blockedUserIds || []).map(
      (id) => new mongoose.Types.ObjectId(id)
    );
    const filteredBlockedUsers = blockedUsers.filter(
      (id) => !id.equals(userObjectId)
    );

    const posts = await Post.aggregate([
      { $sort: { createdAt: -1 } },

      {
        $match: {
          user: {
            $nin: [...filteredBlockedUsers, userObjectId], // Exclude both blocked users and the current user
          },
        },
      },

      // Attach user details
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },

      // Attach comments
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "post",
          as: "comments",
        },
      },

      // Attach raw likes (with just user IDs)
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "post",
          as: "likesRaw",
        },
      },

      // Attach bookmarks
      {
        $lookup: {
          from: "bookmarks",
          localField: "_id",
          foreignField: "postId",
          as: "bookmarks",
        },
      },

      // Lookup full user data of liked users
      {
        $lookup: {
          from: "users",
          let: { likeUsers: "$likesRaw.user" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $in: ["$_id", "$$likeUsers"] },
                    { $not: [{ $in: ["$_id", filteredBlockedUsers] }] },
                  ],
                },
              },
            },
            {
              $project: {
                _id: 1,
                username: 1,
                avatar: 1,
              },
            },
          ],
          as: "likes",
        },
      },

      // Add computed fields
      {
        $addFields: {
          commentCount: {
            $size: {
              $filter: {
                input: "$comments",
                as: "comment",
                cond: {
                  $not: [{ $in: ["$$comment.user", filteredBlockedUsers] }],
                },
              },
            },
          },
          likeCount: { $size: "$likes" },
          isLiked: {
            $gt: [
              {
                $size: {
                  $filter: {
                    input: "$likes",
                    as: "like",
                    cond: { $eq: ["$$like._id", userObjectId] },
                  },
                },
              },
              0,
            ],
          },
          isBookmarked: {
            $gt: [
              {
                $size: {
                  $filter: {
                    input: "$bookmarks",
                    as: "bookmark",
                    cond: { $eq: ["$$bookmark.userId", userObjectId] },
                  },
                },
              },
              0,
            ],
          },
        },
      },

      // Final cleanup
      {
        $project: {
          bookmarks: 0,
          comments: 0,
          likesRaw: 0,
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);

    res.status(200).json({
      count: posts.length,
      result: posts,
      page,
      hasMore: posts.length === limit,
    });
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

    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const blockedUsers = (req.blockedUserIds || []).map(
      (id) => new mongoose.Types.ObjectId(id)
    );

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const post = await Post.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
          user: { $nin: blockedUsers },
        },
      },

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
          likeCount: { $size: "$likes" },
          isLiked: {
            $gt: [
              {
                $size: {
                  $filter: {
                    input: "$likes",
                    as: "like",
                    cond: { $eq: ["$$like.user", userObjectId] },
                  },
                },
              },
              0,
            ],
          },
          isBookmarked: {
            $gt: [
              {
                $size: {
                  $filter: {
                    input: "$bookmarks",
                    as: "bookmark",
                    cond: { $eq: ["$$bookmark.userId", userObjectId] },
                  },
                },
              },
              0,
            ],
          },
        },
      },

      {
        $project: {
          likes: 0, // Remove likes array completely
          bookmarks: 0,
          comments: 0,
        },
      },
    ]);

    if (!post.length) {
      return res.status(404).json({ message: "Post not found" });
    }
    console.log(post);
    res.status(200).json({ count: 1, result: post[0] });
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ error: "Could not fetch post." });
  }
};

export const getPostLikes = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Post ID is required" });
  }

  try {
    const blockedUsers = (req.blockedUserIds || []).map(
      (userId) => new mongoose.Types.ObjectId(userId)
    );

    const likes = await Like.aggregate([
      // 🎯 1. Match likes for the specific post
      {
        $match: { post: new mongoose.Types.ObjectId(id) },
      },

      // 👥 2. Lookup user details for each like
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userDetails",
        },
      },

      // 🔄 3. Flatten the userDetails array
      {
        $unwind: "$userDetails",
      },

      // 🚫 4. Exclude likes from blocked users
      {
        $match: {
          "userDetails._id": { $nin: blockedUsers },
        },
      },

      // ✅ 5. Select only required fields
      {
        $project: {
          _id: 0,
          "userDetails._id": 1,
          "userDetails.username": 1,
          "userDetails.avatar": 1,
        },
      },
    ]);

    // Format final response
    const reformattedLikes = likes.map((like) => ({
      id: like.userDetails._id,
      username: like.userDetails.username,
      avatar: like.userDetails.avatar,
    }));

    return res.status(200).json({ success: true, likes: reformattedLikes });
  } catch (error) {
    console.error("Error fetching post likes:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, image } = req.body;
    const userId = req?.user?.id;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    // Check if the post exists
    const existingPost = await Post.findById(id);
    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Ensure the user is the owner of the post
    if (existingPost.user.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to edit this post" });
    }

    // Update the post
    existingPost.title = title;
    existingPost.image = image;
    await existingPost.save();

    res
      .status(200)
      .json({ message: "Post updated successfully", post: existingPost });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating post", error: error.message });
  }
};
