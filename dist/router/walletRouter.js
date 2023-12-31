"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const walletController_1 = require("../controller/walletController");
const wallet = (0, express_1.Router)();
wallet.route("/:userID/request-loan").post(walletController_1.requestLoan);
wallet.route("/:userID/pay-loan").post(walletController_1.payLoan);
wallet.route("/:userID/pay-later").post(walletController_1.payLater);
wallet.route("/:userID/pay-now").post(walletController_1.payNow);
exports.default = wallet;
