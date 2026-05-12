import mongoose, { Schema, models, model } from "mongoose";

const SupportSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["general", "bug", "feedback", "report"],
      default: "general",
    },

    reply: {
  type: String,
  default: "",
},
isResolved: {
  type: Boolean,
  default: false,
},
  },
  {
    timestamps: true, 
  }
);

const Support = models.Support || model("Support", SupportSchema);

export default Support;