import User from "../schemas/User.js";
import mongoose from "mongoose";
import Post from "../schemas/Post.js";
import Block from "../schemas/BlockSchema.js";
import Snippet from "../schemas/Snippet.js";
import Follower from "../schemas/Followers.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
//login route goes here.
export const saveUser = async (req, res) => {
  const { email, id, name, avatar, username } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        id,
        name,
        email,
        avatar,
        username,
        isOnboarded: false,
      });
      await user.save();
    }

    // ✅ Generate a JWT access token (valid for 15 minutes)
    const accessToken = jwt.sign({ id: user.id }, process.env.NEXTAUTH_SECRET, {
      expiresIn: "5m",
    });

    // ✅ Generate a JWT refresh token (valid for 7 days)
    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.NEXTAUTH_SECRET,
      { expiresIn: "7d" }
    );

    const token = `${refreshToken}${process.env.separator}${accessToken}`;

    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      username: user.username,
      isOnboarded: user.isOnboarded,
      session: token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create or fetch user",
      error: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const { username } = req.params;
    const loggedInUserId = req.user?.id;

    if (!loggedInUserId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Find the target user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Convert to ObjectId for comparisons
    const loggedInObjectId = new mongoose.Types.ObjectId(loggedInUserId);
    const targetObjectId = new mongoose.Types.ObjectId(user._id);

    // Check for block in both directions
    const isBlocked = await Block.exists({
      $or: [
        { blocker: loggedInObjectId, blocked: targetObjectId },
        { blocker: targetObjectId, blocked: loggedInObjectId },
      ],
    });

    if (isBlocked) {
      return res.status(403).json({ error: "User not available" });
    }

    // Count the total number of posts created by the user
    const postCount = await Post.countDocuments({ user: user._id });

    // Count the total number of snippets created by the user
    const snippetCount = await Snippet.countDocuments({ user: user._id });

    const followers = await Follower.find({ followingId: user._id }).select(
      "followerId"
    );

    const following = await Follower.countDocuments({
      followerId: user._id,
    });

    // Return the user data with counts
    res.status(200).json({
      user,
      postCount,
      snippetCount,
      followers,
      following,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Could not fetch user data." });
  }
};

export const checkUsername = async (req, res) => {
  try {
    // Check if the request method is GET
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const { username } = req.params;
    console.log(username);

    // Validate username presence
    if (!username) {
      return res.status(400).json({ message: "Username is required." });
    }

    // Validate username format using regex
    const usernameRegex = /^[a-zA-Z0-9._-]+$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        message:
          "Invalid username. Only letters, numbers, '.', '_', and '-' are allowed.",
      });
    }

    // Validate username length
    if (username.length < 3 || username.length > 30) {
      return res.status(400).json({
        message: "Username must be between 3 and 30 characters long.",
      });
    }

    // Check if username exists in the database
    const user = await User.findOne({ username });

    // Return response based on availability
    if (user) {
      return res.status(200).json({
        available: false,
        message: "Username is already taken.",
      });
    }

    res.status(200).json({
      available: true,
      message: "Username is available.",
    });
  } catch (error) {
    console.error("Error checking username:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params; // Assuming email is being sent from the frontend
  const { tagline, bio, username } = req.body;

  try {
    if (!id)
      return res
        .status(404)
        .json({ message: "user does not exist.", success: false });

    if (!username)
      return res
        .status(404)
        .json({ message: "username is required.", success: false });
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    user.tagline = tagline || user.tagline;
    user.bio = bio || user.bio;
    user.username = username.toLowerCase() || user.username;
    user.isOnboarded = true;

    await user.save();

    res
      .status(200)
      .json({ message: "User updated successfully", success: true });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Could not update user." });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const { token: currentUserId } = req.params; // Assuming current logged-in user's ID is available

    // Aggregation pipeline
    const users = await User.aggregate([
      {
        $lookup: {
          from: "followers", // The collection name for Follower
          localField: "_id", // Field in the User collection
          foreignField: "followingId", // Field in the Follower collection
          as: "followers", // Output array for followers
        },
      },
      {
        $lookup: {
          from: "followers",
          localField: "_id",
          foreignField: "followerId",
          as: "following", // Output array for following
        },
      },
      {
        $project: {
          _id: 1,
          username: 1,
          name: 1,
          avatar: 1,
          bio: 1,
          tagline: 1,
          followers: {
            $map: { input: "$followers", as: "f", in: "$$f.followerId" },
          }, // Extract only followerId
          following: {
            $map: { input: "$following", as: "f", in: "$$f.followingId" },
          }, // Extract only followingId
          isFollowing: {
            $in: [currentUserId, "$followers.followerId"], // Check if logged-in user follows them
          },
        },
      },
    ]);

    // Respond with the transformed user data
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Error fetching users with follower data:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to fetch users",
      error: error.message,
    });
  }
};
