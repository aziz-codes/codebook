import Post from "../schemas/Post.js";
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

export const getPosts = async (req,res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username avatar name")
      .sort({ createdAt: -1 });

     res.status(200).json({count:posts.length,result:posts})
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Could not fetch posts.");
  }
};
