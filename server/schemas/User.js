import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    username: {
      type: String,
    },
    bio: {
      type: String,
    },
    tagline:{
      type: String
    },
    isOnboarded: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("user", userSchema);
export default User; 