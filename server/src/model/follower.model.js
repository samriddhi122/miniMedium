import mongoose, { Schema } from "mongoose";

const followersSchema = new Schema(
  {
    follower: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Followers = mongoose.model("Followers", followersSchema);