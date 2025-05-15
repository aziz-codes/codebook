import mongoose from "mongoose";

const BlockedUserSchema = new mongoose.Schema(
  {
    blocker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    blocked: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Prevent duplicate blocks
BlockedUserSchema.index({ blocker: 1, blocked: 1 }, { unique: true });

const BlockUserSchema =
  mongoose.models.BlockUsers || mongoose.model("BlockUsers", BlockedUserSchema);

export default BlockUserSchema;
