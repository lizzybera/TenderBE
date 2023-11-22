"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = require("../controller/productController");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)().single("image");
const router = express_1.default.Router();
router.route("/create-product").post(upload, productController_1.createProduct);
router.route("/:userID/:productID/add-to-cart").post(productController_1.addProductToCart);
router.route("/:productID/update-product").patch(upload, productController_1.updateProduct);
router.route("/read-products").get(productController_1.allProducts);
router.route("/:productID/one-product").get(productController_1.oneProduct);
router.route("/:productID/delete-product").delete(productController_1.deleteProduct);
router.route("/:userID/empty-cart").patch(productController_1.emptyCart);
exports.default = router;
