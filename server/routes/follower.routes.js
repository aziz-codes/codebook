 import express from 'express';
 import Follower from '../schemas/Followers.js';
const router = express.Router();

// Add a follower
router.post("/follow/:followerId", async (req, res) => {
  const followingId = req.params.followerId;
  const {  followerId } = req.body;
  
  try {
    // Prevent self-follow
    if (followerId === followingId) {
      return res.status(400).json({ success: false, message: "Cannot follow yourself" });
    }

    // Add follow relationship
    await Follower.create({ followerId, followingId });
    res.status(200).json({ success: true, message: "Followed successfully" });
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate entry error
      return res.status(400).json({ success: false, message: "Already following" });
    }
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// Remove a follower
router.delete("/unfollow", async (req, res) => {
  const { followerId, followingId } = req.body;

  try {
    // Remove follow relationship
    await Follower.findOneAndDelete({ followerId, followingId });
    res.status(200).json({ success: true, message: "Unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// Get all followers of a user
router.get("/followers/:userId", async (req, res) => {
  try {
    const followers = await Follower.getFollowers(req.params.userId);
    res.status(200).json({ success: true, followers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

// Get all users a user is following
router.get("/following/:userId", async (req, res) => {
  try {
    const following = await Follower.getFollowing(req.params.userId);
    res.status(200).json({ success: true, following });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

export default router;
