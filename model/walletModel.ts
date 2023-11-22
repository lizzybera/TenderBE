import { Schema, model } from "mongoose";
import { iWalletData } from "../utils/interface";

const walletModel = new Schema<iWalletData>(
  {
    email: {
      type: String,
    },
    amount: {
      type: Number,
    },
    userID: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<iWalletData>("wallets", walletModel);
