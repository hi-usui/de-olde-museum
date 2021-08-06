import mongoose from "mongoose";

const ArtSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Untitled Artpiece",
    },
    artist: {
      type: String,
    },
  },
  { timestamps: { createdAt: "_created", updatedAt: "_updated" } }
);

export const Art = mongoose.model("arts", ArtSchema);
