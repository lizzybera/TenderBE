import mongoose from "mongoose";

export interface iUser {
  email: string;
  password: string;
  verified: boolean;
  token: string;
  history: Array<{}>;
  BVN : string;
  cart : []
}

export interface iHistory {
  history: Array<{}>;
}

export interface iCart {
  history: Array<{}>;
}

export interface iUserData extends iUser, mongoose.Document {}

export interface iCartData extends iCart, mongoose.Document {}

export interface iHistoryData extends iHistory, mongoose.Document {}

