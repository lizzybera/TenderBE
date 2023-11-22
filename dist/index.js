"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const envVariables_1 = require("./config/envVariables");
const dataBase_1 = require("./config/dataBase");
const app_1 = require("./app");
const port = parseInt(envVariables_1.envVar.PORT);
const app = (0, express_1.default)();
(0, app_1.appConfig)(app);
const server = app.listen(process.env.PORT || port, () => {
    (0, dataBase_1.dbConfig)();
});
process.on("uncaughtException", (error) => {
    console.log("uncaughtException: ", error);
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.log("unhandledRejection: ", reason);
    server.close(() => {
        process.exit(1);
    });
});
