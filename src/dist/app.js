"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const mainError_1 = require("./error/mainError");
const errorHandling_1 = require("./error/errorHandling");
const authRouter_1 = __importDefault(require("./router/authRouter"));
const productRouter_1 = __importDefault(require("./router/productRouter"));
const walletRouter_1 = __importDefault(require("./router/walletRouter"));
const appConfig = (app) => {
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
    app.use((0, morgan_1.default)("dev"));
    app.set("view engine", "ejs");
    app.use("/", authRouter_1.default);
    app.use("/", productRouter_1.default);
    app.use("/", walletRouter_1.default);
    app.get("/", (req, res) => {
        try {
            return res.status(mainError_1.HTTP.OK).json({
                message: "API route is ready",
            });
        }
        catch (error) {
            return res.status(mainError_1.HTTP.BAD).json({
                message: "error on API route",
                data: error.message,
            });
        }
    });
    app
        .all("*", (req, res, next) => {
        new mainError_1.mainError({
            name: `This is an API Route Error`,
            status: mainError_1.HTTP.BAD,
            success: false,
            message: `This is happening as a result of invalid route being this: ${req.originalUrl}`,
        });
    })
        .use(errorHandling_1.errorHandling);
};
exports.appConfig = appConfig;
