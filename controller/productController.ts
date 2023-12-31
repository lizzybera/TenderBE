import { Request, Response } from "express";
import ProductModel from "../model/ProductModel";
import { HTTP } from "../error/mainError";
import { streamUpload } from "../utils/streamUpload";
import authModel from "../model/authModel";
import mongoose from "mongoose";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { productName, price } = req.body;
    const { secure_url, public_id }: any = await streamUpload(req);
    const newProduct = await ProductModel.create({
      productName,
      price,
      image: secure_url,
      imageID: public_id,
    });
    res.status(HTTP.CREATE).json({
      message: "Product created",
      data: newProduct,
    });
  } catch (error) {
    res.status(HTTP.BAD).json({
      message: "Product created",
    });
  }
};

export const allProducts = async (req: Request, res: Response) => {
  try {
    const Products = await ProductModel.find();
    res.status(HTTP.OK).json({
      message: "Reading products",
      data: Products,
    });
  } catch (error) {
    res.status(HTTP.BAD).json({
      message: "Products couldn't be read",
    });
  }
};

export const oneProduct = async (req: Request, res: Response) => {
  try {
    const { productID } = req.params;
    const Products = await ProductModel.findById(productID);
    res.status(HTTP.OK).json({
      message: "Reading one products",
      data: Products,
    });
  } catch (error) {
    res.status(HTTP.BAD).json({
      message: "Product couldn't be read",
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productID } = req.params;
    const newProduct = await ProductModel.findByIdAndDelete(productID);
    res.status(HTTP.CREATE).json({
      message: "Product deleted",
      data: newProduct,
    });
  } catch (error) {
    res.status(HTTP.BAD).json({
      message: "Product couldn't be deleted",
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { secure_url, public_id }: any = await streamUpload(req);
    const updateProduct = await ProductModel.findByIdAndUpdate(
      userID,
      {
        image: secure_url,
        imageID: public_id,
      },
      { new: true }
    );

    res.status(HTTP.CREATE).json({
      message: "Product updated",
      data: updateProduct,
    });
  } catch (error) {
    res.status(HTTP.BAD).json({
      message: "Product not updated",
    });
  }
};

export const addProductToCart = async (req: Request, res: Response) => {
  try {
    const { userID, productID } = req.params;
    const user = await authModel.findById(userID);
    // const product = await ProductModel.findById(productID)

    user?.cart.push(productID);
    user?.save();
    res.status(HTTP.CREATE).json({
      message: "Product has been added to cart",
    });
  } catch (error) {
    res.status(HTTP.BAD).json({
      message: "Product couldn't be added to cart",
    });
  }
};

export const emptyCart = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user = await authModel.findById(userID);
    // const product = await ProductModel.findById(productID)
    const emptCart = await authModel.findByIdAndUpdate(
      userID,
      {
        cart: [],
      },
      { new: true }
    );

    res.status(HTTP.CREATE).json({
      message: "Cart is empty",
    });
  } catch (error) {
    res.status(HTTP.BAD).json({
      message: "Cart couldn't be emptied",
    });
  }
};

// export const deleteCart  = async (req:Request,res:Response)=>{
//     try {
//         const {} = req.params
//         const user = await authModel.findById(userID)
//         // const product = await ProductModel.findById(productID)

//         user?.cart.push(productID)
//         user?.save()
//         res.status(HTTP.CREATE).json({
//             message:"Product has been added to cart"
//         })
//     } catch (error) {
//         res.status(HTTP.BAD).json({
//             message:"Product couldn't be added to cart"
//         })
//     }
// }
