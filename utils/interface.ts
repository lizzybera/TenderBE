import mongoose from "mongoose";

export interface iUser {
  email: string;
  password: string;
  verified: boolean;
  token: string;
  history: Array<{}>;
  BVN : string;
  cart : Array<String>,
  loan : number,
  creditWallet : number
}
  

export interface iProduct {
  productName: string;
  price: number;
  image: string;
  imageID: string;
}

export interface iProductData extends iProduct,mongoose.Document{}

export interface iHistory {
  history: Array<{}>;
}

export interface iCart {
  history: Array<{}>;
}

export interface iUserData extends iUser, mongoose.Document {}

export interface iCartData extends iCart, mongoose.Document {}

export interface iHistoryData extends iHistory, mongoose.Document {}

