import mongoose from "mongoose";

const PasteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
    remainingViews: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Paste", PasteSchema);
