import mongoose from "mongoose";

const ArtSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    img: {
      contentType: { type: String, required: true },
      data: { type: Buffer, required: true },
      filename: { type: String, required: true },
    },
  },
  { timestamps: { createdAt: "_created", updatedAt: "_updated" } }
);

export const Art = mongoose.model("arts", ArtSchema);
