import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

const globalAny = global as any;

if (!globalAny.mongoose) {
  globalAny.mongoose = { conn: null, promise: null };
}

export const dbConnect = async () => {
  if (globalAny.mongoose.conn) return globalAny.mongoose.conn;

  if (!globalAny.mongoose.promise) {
    globalAny.mongoose.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  globalAny.mongoose.conn = await globalAny.mongoose.promise;

  return globalAny.mongoose.conn;
};