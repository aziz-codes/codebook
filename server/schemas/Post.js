import mongoose from 'mongoose';
const PostSchema = new mongoose.Schema(
    {
      user:{
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
      },
      title:{
        type: String,
        required: true
      },
      image:{
        type: String
      }
    },
    {timestamps: true}
)

const Post = mongoose.models.Post || mongoose.model('Post',PostSchema);
export default Post;