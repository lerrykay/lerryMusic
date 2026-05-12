import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false, 
    },

    profileImage: {
      type: String, 
      default: "",
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    favoriteArtist: {
      type: String,
      default: "",
    },

    favoriteGenre: {
      type: String,
      enum: [
        "Afrobeats",
        "Hip Hop",
        "R&B",
        "Pop",
        "EDM",
        "Amapiano",
        "Gospel",
        "Jazz",
        "Reggae",
      ],
      required: true,
    },
    role: {
     type:String,
     enum: ["user", "admin"],
     default: "user",
    },
  bio: {
  type: String,
  default: "",
},
  },
  { timestamps: true }
);




const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;