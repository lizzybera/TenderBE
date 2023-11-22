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
exports.payNow = exports.payLater = exports.payLoan = exports.requestLoan = void 0;
const mainError_1 = require("../error/mainError");
const authModel_1 = __importDefault(require("../model/authModel"));
const walletModel_1 = __importDefault(require("../model/walletModel"));
const https_1 = __importDefault(require("https"));
const requestLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { amount } = req.body;
        const user = yield authModel_1.default.findById(userID);
        if (user) {
            if ((user === null || user === void 0 ? void 0 : user.loaned) === 0) {
                const wallet = yield walletModel_1.default.create({
                    amount: parseInt(amount),
                    email: user.email,
                });
                let interestRate = amount * 0.026;
                let totalAmount = interestRate + amount;
                console.log(totalAmount);
                user.creditWallet += amount;
                user.loaned = -parseInt(totalAmount);
                yield user.save();
                return res.status(mainError_1.HTTP.CREATE).json({
                    message: "successfully requested loan",
                    data: wallet,
                });
            }
            else {
                return res.status(mainError_1.HTTP.CREATE).json({
                    message: "Please go and clear ur debt",
                });
            }
        }
        else {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "error",
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error",
            data: error.message,
        });
    }
});
exports.requestLoan = requestLoan;
const payLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { amount } = req.body;
        const user = yield authModel_1.default.findById(userID);
        if ((user === null || user === void 0 ? void 0 : user.loaned) === 0 || (user === null || user === void 0 ? void 0 : user.loaned) > amount) {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "Congrats you have completed your loan",
            });
        }
        else {
            const params = JSON.stringify({
                email: user === null || user === void 0 ? void 0 : user.email,
                amount: parseInt(amount) * 100,
                userID
            });
            const options = {
                hostname: "api.paystack.co",
                port: 443,
                path: "/transaction/initialize",
                method: "POST",
                headers: {
                    Authorization: "Bearer sk_test_ec1b0ccabcb547fe0efbd991f3b64b485903c88e",
                    "Content-Type": "application/json",
                },
            };
            const ask = https_1.default.request(options, (resp) => {
                let data = "";
                resp.on("data", (chunk) => {
                    data += chunk;
                });
                resp.on("end", () => {
                    console.log(JSON.parse(data));
                    res.status(mainError_1.HTTP.OK).json({
                        message: "Payment successful",
                        data: JSON.parse(data),
                    });
                    user.loaned += amount;
                    user.save();
                });
            })
                .on("error", (error) => {
                console.error(error);
            });
            ask.write(params);
            ask.end();
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error",
            data: error.message,
        });
    }
});
exports.payLoan = payLoan;
const payLater = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { amount } = req.body;
        const user = yield authModel_1.default.findById(userID);
        if ((user === null || user === void 0 ? void 0 : user.creditWallet) === 0 || amount > (user === null || user === void 0 ? void 0 : user.creditWallet)) {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "Please check your credit wallet",
            });
        }
        else {
            const params = JSON.stringify({
                email: user === null || user === void 0 ? void 0 : user.email,
                amount: parseInt(amount) * 100,
                userID
            });
            const options = {
                hostname: "api.paystack.co",
                port: 443,
                path: "/transaction/initialize",
                method: "POST",
                headers: {
                    Authorization: "Bearer sk_test_ec1b0ccabcb547fe0efbd991f3b64b485903c88e",
                    "Content-Type": "application/json",
                },
            };
            const ask = https_1.default.request(options, (resp) => {
                let data = "";
                resp.on("data", (chunk) => {
                    data += chunk;
                });
                resp.on("end", () => {
                    console.log(JSON.parse(data));
                    res.status(mainError_1.HTTP.OK).json({
                        message: "Payment successful",
                        data: JSON.parse(data),
                    });
                    user.creditWallet -= amount;
                    user.save();
                });
            })
                .on("error", (error) => {
                console.error(error);
            });
            ask.write(params);
            ask.end();
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error",
            data: error.message,
        });
    }
});
exports.payLater = payLater;
const payNow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const { amount } = req.body;
        const user = yield authModel_1.default.findById(userID);
        const params = JSON.stringify({
            email: user === null || user === void 0 ? void 0 : user.email,
            amount: parseInt(amount) * 100,
            userID
        });
        const options = {
            hostname: "api.paystack.co",
            port: 443,
            path: "/transaction/initialize",
            method: "POST",
            headers: {
                Authorization: "Bearer sk_test_ec1b0ccabcb547fe0efbd991f3b64b485903c88e",
                "Content-Type": "application/json",
            },
        };
        const ask = https_1.default.request(options, (resp) => {
            let data = "";
            resp.on("data", (chunk) => {
                data += chunk;
            });
            resp.on("end", () => {
                console.log(JSON.parse(data));
                res.status(mainError_1.HTTP.OK).json({
                    message: "Payment successful",
                    data: JSON.parse(data),
                });
            });
        })
            .on("error", (error) => {
            console.error(error);
        });
        ask.write(params);
        ask.end();
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error",
            data: error.message,
        });
    }
});
exports.payNow = payNow;
