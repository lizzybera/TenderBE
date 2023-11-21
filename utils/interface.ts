import mongoose from "mongoose";

export interface iUser {
  email: string;
  password: string;
  verified: boolean;
  token: string;
  profile: Array<string>;
  history: Array<string>;
  BVN;
}
  

export interface iProduct {
  productName: string;
  price: number;
  image: string;
  imageID: string;
}

export interface iProductData extends iProduct,mongoose.Document{}
export interface iUserData extends iUser, mongoose.Document {}

