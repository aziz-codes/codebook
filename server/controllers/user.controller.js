import User from "../schemas/User.js";
import Post from '../schemas/Post.js';
import Snippet from '../schemas/Snippet.js';
export const saveUser = async (req, res) => {
  
    const { email, id, name, avatar, username } = req.body;
 
    try {
        let user = await User.findOne({ email });
        if (!user) {
            user = new User({ id, name, email, avatar, username,isOnboarded: false, });
            await user.save();
            
            
        }
        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            username: user.username,
            isOnboarded: user.isOnboarded
        });
        
    } catch (error) {
        res.status(500).json({ message: "Failed to create or fetch user", error: error.message });
    }
}


export const getUser = async (req, res) => {
    try {
      const { username } = req.params;
  
      // Fetch user details from the User model
      const user = await User.findOne({ username }).select("username name avatar");
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Count the total number of posts created by the user
      const postCount = await Post.countDocuments({ user: user._id });
  
      // Count the total number of snippets created by the user
      const snippetCount = await Snippet.countDocuments({ user: user._id });
  
      // Return the user data with post and snippet counts
      res.status(200).json({
        user: {
          username: user.username,
          name: user.name,
          avatar: user.avatar,
        },
        postCount,
        snippetCount,
      });
  
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).json({ error: "Could not fetch user data." });
    }
  };