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
exports.viewOneUser = exports.viewAllUser = exports.deleteUser = exports.signInUser = exports.verifyUser = exports.registerUser = void 0;
const mainError_1 = require("../error/mainError");
const authModel_1 = __importDefault(require("../model/authModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const email_1 = require("../utils/email");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, BVN } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        const value = crypto_1.default.randomBytes(10).toString("hex");
        const user = yield authModel_1.default.create({
            email,
            password: hashed,
            token: value,
            BVN,
            creditWallet: 0,
            loaned: 0
        });
        const tokenID = jsonwebtoken_1.default.sign({ id: user._id }, "token");
        (0, email_1.sendMail)(user, tokenID).then(() => {
            console.log("Mail sent...!");
        });
        return res.status(mainError_1.HTTP.CREATE).json({
            message: "Registered user",
            data: user,
            tokenID,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error registering user",
            data: error.message,
        });
    }
});
exports.registerUser = registerUser;
const verifyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        const getUserID = jsonwebtoken_1.default.verify(token, "token", (err, payload) => {
            if (err) {
                return err;
            }
            else {
                return payload;
            }
        });
        const user = yield authModel_1.default.findByIdAndUpdate(getUserID.id, {
            token: "",
            verified: true,
        }, { new: true });
        return res.status(mainError_1.HTTP.OK).json({
            message: "verified user",
            data: user,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error verifying user",
            data: error.message,
        });
    }
});
exports.verifyUser = verifyUser;
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield authModel_1.default.findOne({ email });
        if (user) {
            const checkPassword = yield bcrypt_1.default.compare(password, user.password);
            if (checkPassword) {
                if (user.verified && user.token === "") {
                    const token = jsonwebtoken_1.default.sign({ id: user === null || user === void 0 ? void 0 : user._id, email: user === null || user === void 0 ? void 0 : user.email }, "token");
                    return res.status(mainError_1.HTTP.CREATE).json({
                        message: `Welcome Back`,
                        data: token,
                    });
                }
                else {
                    return res.status(mainError_1.HTTP.BAD).json({
                        message: "user haven't been verified",
                    });
                }
            }
            else {
                return res.status(mainError_1.HTTP.BAD).json({
                    message: "Password is incorrect",
                });
            }
        }
        else {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "User is not found",
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error signing in user",
            data: error.message,
        });
    }
});
exports.signInUser = signInUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        yield authModel_1.default.findByIdAndDelete(userID);
        return res.status(mainError_1.HTTP.CREATE).json({
            message: "Deleted",
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error deleting user",
            data: error.message,
        });
    }
});
exports.deleteUser = deleteUser;
const viewAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield authModel_1.default.find();
        return res.status(mainError_1.HTTP.OK).json({
            message: "viewing all user",
            data: user,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error viewing all users",
            data: error.message,
        });
    }
});
exports.viewAllUser = viewAllUser;
const viewOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield authModel_1.default.findById(userID);
        return res.status(mainError_1.HTTP.OK).json({
            message: "viewing one user",
            data: user,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD).json({
            message: "error viewing one user",
            data: error.message,
        });
    }
});
exports.viewOneUser = viewOneUser;
