import mongoose from "mongoose";

const followerSchema = new mongoose.Schema(
  {
    followerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Reference to the User model
      required: true,
    },
    followingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Reference to the User model
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Compound index to ensure uniqueness and optimize queries
followerSchema.index({ followerId: 1, followingId: 1 }, { unique: true });

// Static method to check if a user is following another user
followerSchema.statics.isFollowing = async function (followerId, followingId) {
  return !!(await this.findOne({ followerId, followingId }));
};

// Static method to get all followers of a user
followerSchema.statics.getFollowers = async function (userId) {
  return this.find({ followingId: userId }).populate("followerId", "username name avatar");
};

// Static method to get all users a user is following
followerSchema.statics.getFollowing = async function (userId) {
  return this.find({ followerId: userId }).populate("followingId", "username name avatar");
};

const Follower = mongoose.models.Follower || mongoose.model("Follower", followerSchema);

export default Follower;
