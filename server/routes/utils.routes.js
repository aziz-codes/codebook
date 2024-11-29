import express from 'express';
import User from '../schemas/User.js'
import Follower from '../schemas/Followers.js';
import Post from '../schemas/Post.js';
import Snippet from '../schemas/Snippet.js';
const router = express.Router();



router.get("/get-top-followed-users/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      // Fetch the user based on the provided ID
      const user = await User.findById(id); 
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
  
      // Fetch all users and calculate their followers count
      const users = await User.find().select("-password");
  
      // Fetch additional stats (followers count) for each user
      const usersWithFollowers = await Promise.all(
        users.map(async (user) => {
          const followersCount = await Follower.countDocuments({ followingId: user._id });
  
          return {
            ...user.toObject(), // Convert Mongoose document to plain object
            followersCount
          };
        })
      );
  
      // Sort users based on the number of followers (descending order)
      const sortedUsers = usersWithFollowers.sort((a, b) => b.followersCount - a.followersCount);
  
      // Get the top 2 users with the most followers
      
  
      // Return the top 2 users with followers count
      res.status(200).json(sortedUsers);
  
    } catch (err) {
      res.status(500).json({ message: err.message });
      console.log(err);
    }
  });
  
  

export default router;