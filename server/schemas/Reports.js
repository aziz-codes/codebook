import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
    postCreator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    remarks: { type: String, default: "" },
    reporter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const Reports =
  mongoose.models.Reports || mongoose.model("Reports", ReportSchema);
export default Reports;
