import Like from "../schemas/Like.js"; // Assuming you have a Like schema
import Post from "../schemas/Post.js";

export const toggleLikePost = async (req, res) => {
  try {
    const { id: postId } = req.params; // Get postId from the URL
    const { userId } = req.body; // Get userId from the request body

    // Check if the user has already liked the post
    const existingLike = await Like.findOne({ post: postId, user: userId });

    if (existingLike) {
      // Dislike (remove the like)
      await Like.findByIdAndDelete(existingLike._id);
      await Post.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } });

      return res.status(200).json({ message: "Post disliked" });
    } else {
      // Like the post
      const newLike = new Like({ post: postId, user: userId });
      await newLike.save();
      await Post.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } });

      return res.status(201).json({ message: "Post liked" });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({ error: "Could not toggle like" });
  }
};
