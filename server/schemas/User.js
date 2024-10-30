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
  },
  { timestamps: true }
);

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;