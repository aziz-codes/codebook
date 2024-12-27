// schemas/Bookmark.js
import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  createdAt: { type: Date, default: Date.now },
});

const Bookmark =
  mongoose.models.Bookmark || mongoose.model("Bookmark", bookmarkSchema);

export default Bookmark;
