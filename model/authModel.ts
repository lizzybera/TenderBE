import mongoose from "mongoose";
import { iUserData } from "../utils/interface";

const authModel = new mongoose.Schema<iUserData>(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    verified: {
      type: Boolean,
    },
    token: {
      type: String,
    },
    BVN: {
      type: String,
    },
    loaned: {
      type: Number,
    },
    creditWallet: {
      type: Number,
    },
    cart:{
      type: [String]
    },
  },
  { timestamps: true }
);

export default mongoose.model<iUserData>("users", authModel);
