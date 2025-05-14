import Post from "../schemas/Post.js";
import Reports from "../schemas/Reports.js";

export const reportPost = async (req, res) => {
  const { postId, reason, remarks } = req.body; // Extracting postId and reason from request body
  const userId = req.user?.id; // Assuming user info is attached via JWT middleware
  if (!userId) {
    return res.status(400).json({ message: "Not authorized" });
  }
  // Validation for required fields
  if (!postId || !reason) {
    return res.status(400).json({ message: "Post ID and reason are required" });
  }

  try {
    // 1. Find the post being reported
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const postCreatorId = post.user;

    const report = new Reports({
      post: postId,
      postCreator: postCreatorId,
      reason,
      remarks: remarks || "",
      reporter: userId,
      status: "pending",
    });

    // 4. Save the report to the database
    await report.save();

    // 5. Return success response
    return res
      .status(201)
      .json({ success: true, message: "Post reported successfully" });
  } catch (error) {
    // Handle any unexpected errors
    return res.status(500).json({
      message: "Error reporting post",
      error: error.message,
      success: false,
    });
  }
};
