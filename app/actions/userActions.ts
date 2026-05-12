"use server";

import bcrypt from "bcryptjs";
import { dbConnect } from "../lib/dbConnect";
import User from "../models/user";
import { signToken } from "../lib/jwt";
import { sendWelcomeEmail } from "../lib/sendEmail";

type AuthResponse = {
  success: boolean;
  message: string;
  user?: any;
};


export async function signupUser(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImage?: string;
  dateOfBirth: string;
  favoriteArtist: string;
  favoriteGenre: string;
}): Promise<AuthResponse> {
  try {
    await dbConnect();

    const existingUser = await User.findOne({
      email: data.email,
    });

    if (existingUser) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    const hashedPassword = await bcrypt.hash(
      data.password,
      10
    );

    const user = await User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      profileImage: data.profileImage || "",
      dateOfBirth: data.dateOfBirth,
      favoriteArtist: data.favoriteArtist,
      favoriteGenre: data.favoriteGenre,
    });

  
    try {
      await sendWelcomeEmail(
        user.email,
        user.firstName
      );
    } catch (emailError) {
      console.log(
        "EMAIL ERROR (non-blocking):",
        emailError
      );
    }

    return {
      success: true,
      message: "Account created successfully",
      user: {
        id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileImage: user.profileImage,
        dateOfBirth: user.dateOfBirth,
        favoriteArtist: user.favoriteArtist,
        favoriteGenre: user.favoriteGenre,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Signup failed",
    };
  }
}


export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  try {
    await dbConnect();

    const user = await User.findOne({
      email: data.email,
    }).select("+password");

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const isMatch = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!isMatch) {
      return {
        success: false,
        message: "Invalid password",
      };
    }

    const token = await signToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return {
      success: true,
      message: "Login successful",
      user: {
        id: user._id.toString(),
        firstName: user.firstName,
        email: user.email,
        profileImage: user.profileImage,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "Server error",
    };
  }
}