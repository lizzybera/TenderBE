"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const authModel = new mongoose_1.default.Schema({
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    verified: {
        type: Boolean,
    },
    token: {
        type: String,
    },
    BVN: {
        type: String,
    },
    loaned: {
        type: Number,
    },
    creditWallet: {
        type: Number,
    },
    cart: {
        type: [String]
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("users", authModel);
