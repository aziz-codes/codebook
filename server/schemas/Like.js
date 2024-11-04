import mongoose from "mongoose";
const likeSchema = new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    },
    { timestamps: true }
  );
  
  likeSchema.index({ post: 1, user: 1 }, { unique: true });  
  const Like = mongoose.models.Like || mongoose.model("Like",likeSchema)
  export default Like;
  