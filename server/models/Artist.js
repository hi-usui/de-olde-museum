import mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "_created", updatedAt: "_updated" } }
);

export const Artist = mongoose.model("artists", ArtistSchema);
