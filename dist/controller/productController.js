"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyCart = exports.addProductToCart = exports.updateProduct = exports.deleteProduct = exports.oneProduct = exports.allProducts = exports.createProduct = void 0;
const ProductModel_1 = __importDefault(require("../model/ProductModel"));
const mainError_1 = require("../error/mainError");
const streamUpload_1 = require("../utils/streamUpload");
const authModel_1 = __importDefault(require("../model/authModel"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productName, price } = req.body;
        const { secure_url, public_id } = yield (0, streamUpload_1.streamUpload)(req);
        const newProduct = yield ProductModel_1.default.create({
            productName,
            price,
            image: secure_url,
            imageID: public_id,
        });
        res.status(mainError_1.HTTP.CREATE).json({
            message: "Product created",
            data: newProduct,
        });
    }
    catch (error) {
        res.status(mainError_1.HTTP.BAD).json({
            message: "Product created",
        });
    }
});
exports.createProduct = createProduct;
const allProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Products = yield ProductModel_1.default.find();
        res.status(mainError_1.HTTP.OK).json({
            message: "Reading products",
            data: Products,
        });
    }
    catch (error) {
        res.status(mainError_1.HTTP.BAD).json({
            message: "Products couldn't be read",
        });
    }
});
exports.allProducts = allProducts;
const oneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productID } = req.params;
        const Products = yield ProductModel_1.default.findById(productID);
        res.status(mainError_1.HTTP.OK).json({
            message: "Reading one products",
            data: Products,
        });
    }
    catch (error) {
        res.status(mainError_1.HTTP.BAD).json({
            message: "Product couldn't be read",
        });
    }
});
exports.oneProduct = oneProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productID } = req.params;
        const newProduct = yield ProductModel_1.default.findByIdAndDelete(productID);
        res.status(mainError_1.HTTP.CREATE).json({
            message: "Product deleted",
            data: newProduct,
        });
    }
    catch (error) {
        res.status(mainError_1.HTTP.BAD).json({
            message: "Product couldn't be deleted",
        });
    }
});
exports.deleteProduct = deleteProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { secure_url, public_id } = yield (0, streamUpload_1.streamUpload)(req);
        const updateProduct = yield ProductModel_1.default.findByIdAndUpdate(userID, {
            image: secure_url,
            imageID: public_id,
        }, { new: true });
        res.status(mainError_1.HTTP.CREATE).json({
            message: "Product updated",
            data: updateProduct,
        });
    }
    catch (error) {
        res.status(mainError_1.HTTP.BAD).json({
            message: "Product not updated",
        });
    }
});
exports.updateProduct = updateProduct;
const addProductToCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, productID } = req.params;
        const user = yield authModel_1.default.findById(userID);
        // const product = await ProductModel.findById(productID)
        user === null || user === void 0 ? void 0 : user.cart.push(productID);
        user === null || user === void 0 ? void 0 : user.save();
        res.status(mainError_1.HTTP.CREATE).json({
            message: "Product has been added to cart",
        });
    }
    catch (error) {
        res.status(mainError_1.HTTP.BAD).json({
            message: "Product couldn't be added to cart",
        });
    }
});
exports.addProductToCart = addProductToCart;
const emptyCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield authModel_1.default.findById(userID);
        // const product = await ProductModel.findById(productID)
        const emptCart = yield authModel_1.default.findByIdAndUpdate(userID, {
            cart: [],
        }, { new: true });
        res.status(mainError_1.HTTP.CREATE).json({
            message: "Cart is empty",
        });
    }
    catch (error) {
        res.status(mainError_1.HTTP.BAD).json({
            message: "Cart couldn't be emptied",
        });
    }
});
exports.emptyCart = emptyCart;
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
