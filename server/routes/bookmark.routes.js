// routes/bookmarks.js
import express from "express";
import Bookmark from "../schemas/Bookmark.js";

const router = express.Router();

// Add Bookmark
router.post("/add/:postId", async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    // Check if the post is already bookmarked
    const existingBookmark = await Bookmark.findOne({ userId, postId });
    if (existingBookmark) {
      return res
        .status(400)
        .json({ success: false, message: "Post already bookmarked." });
    }

    // Create a new bookmark
    const newBookmark = new Bookmark({ userId, postId });
    await newBookmark.save();
    res.status(200).json({
      success: true,
      message: "Post bookmarked successfully",
      bookmark: newBookmark,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding bookmark",
      error: error.message,
    });
  }
});

// Remove Bookmark
router.delete("/remove/:postId", async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    // Remove the bookmark
    const removedBookmark = await Bookmark.findOneAndDelete({ userId, postId });
    if (!removedBookmark) {
      return res
        .status(404)
        .json({ success: false, message: "Bookmark not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Bookmark removed successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error removing bookmark",
      error: error.message,
    });
  }
});

// Get all Bookmarks of a User
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch all bookmarks of the user
    const bookmarks = await Bookmark.find({ userId }).populate("postId");
    res.status(200).json({ success: true, bookmarks });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching bookmarks",
      error: error.message,
    });
  }
});

export default router;
