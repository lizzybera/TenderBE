import mongoose from "mongoose"
import { iProductData } from "../utils/interface"

const productModel = new mongoose.Schema<iProductData>({
    productName:{
        type:String
    },
    price:{
        type:Number
    },
    image:{
        type:String
    },
    imageID:{
        type:String
    }
})

export default mongoose.model("products",productModel)