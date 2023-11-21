import mongoose from "mongoose";

export interface iUser {
  email: string;
  password: string;
  verified: boolean;
  token: string;
  profile: Array<string>;
  history: Array<string>;
  BVN : string;
}

export interface iHistory {
  history: Array<{}>;
}

export interface iUserData extends iUser, mongoose.Document {}

export interface iHistoryData extends iHistory, mongoose.Document {}

