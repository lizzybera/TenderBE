import express, { Router } from "express"
import { addProductToCart, allProducts, createProduct, deleteProduct, emptyCart, oneProduct, updateProduct } from "../controller/productController"
import multer from "multer"

const upload = multer().single("image")
 const router:Router = express.Router()

 router.route("/create-product").post(upload,createProduct)
 router.route("/:userID/:productID/add-to-cart").post(addProductToCart)
 router.route("/:productID/update-product").patch(upload,updateProduct)
 router.route("/read-products").get(allProducts)
 router.route("/:productID/one-product").get(oneProduct)
 router.route("/:productID/delete-product").delete(deleteProduct)
 router.route("/:userID/empty-cart").patch(emptyCart)

 export default router