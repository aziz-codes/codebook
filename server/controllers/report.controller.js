import Post from "../schemas/Post.js";
import Reports from "../schemas/Reports.js";
import BlockUserSchema from "../schemas/BlockSchema.js";

export const reportPost = async (req, res) => {
  const { postId, reason, remarks, blockUser } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).json({ message: "Not authorized" });
  }

  if (!postId || !reason) {
    return res.status(400).json({ message: "Post ID and reason are required" });
  }

  try {
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

    const saveTasks = [report.save()];

    if (blockUser === true) {
      const block = new BlockUserSchema({
        blocker: userId,
        blocked: postCreatorId,
      });

      // Catch duplicate block error silently
      const blockSave = block.save().catch((err) => {
        if (err.code !== 11000) throw err;
      });

      saveTasks.push(blockSave);
    }

    await Promise.all(saveTasks);

    return res
      .status(201)
      .json({ success: true, message: "Post reported successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error reporting post",
      error: error.message,
      success: false,
    });
  }
};
