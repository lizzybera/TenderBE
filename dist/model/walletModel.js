"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const walletModel = new mongoose_1.Schema({
    email: {
        type: String,
    },
    amount: {
        type: Number,
    },
    userID: {
        type: String,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("wallets", walletModel);
