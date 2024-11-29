import User from "../schemas/User.js";
import Post from "../schemas/Post.js";
import Snippet from "../schemas/Snippet.js";
import Follower from "../schemas/Followers.js";
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
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      username: user.username,
      isOnboarded: user.isOnboarded,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to create or fetch user",
        error: error.message,
      });
  }
};

export const getUser = async (req, res) => {
  try {
    const { username } = req.params;

    // Fetch user details from the User model
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Count the total number of posts created by the user
    const postCount = await Post.countDocuments({ user: user._id });

    // Count the total number of snippets created by the user
    const snippetCount = await Snippet.countDocuments({ user: user._id });

    const followers = await Follower.countDocuments({ followingId: user._id });
    const following = await Follower.countDocuments({ followerId: user._id });

    // Return the user data with post and snippet counts
    res.status(200).json({
      user,
      postCount,
      snippetCount,
      followers,
      following
    });
    console.log(user)
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
    if (!id) return res.status(404).json({ message: "user does not exist.",success:false });

    if(!username) return res.status(404).json({ message: "username is required.",success:false });;
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "User not found",success:false });
    }

    user.tagline = tagline || user.tagline;
    user.bio = bio || user.bio;
    user.username = username.toLowerCase() || user.username;
    user.isOnboarded = true;

    await user.save();

    res.status(200).json({ message: "User updated successfully", success: true });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Could not update user." });
  }
};
