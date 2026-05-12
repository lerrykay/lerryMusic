import mongoose, { Schema, model, models } from "mongoose";

const SongSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    audioUrl: {
      type: String,
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "declined"],
      default: "pending",
    },

    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [
      {
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    coverImage: {
  type: String,
  default: "",
},
  },
  { timestamps: true }
);


const Song = models.Song || model("Song", SongSchema);

export default Song;