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
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const G_ID = "515997591712-h3d7e0p17ipjumbuusqs93f5boldtucr.apps.googleusercontent.com";
const G_SECRET = "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";
const G_REFRESH = "1//04Wc0f74tqzFuCgYIARAAGAQSNwF-L9Irdku-fajBIhK05UXlrAh8sZzFFiHRk3NCbjfDlo3yf_1umhcXijr8A-2nl2p4YSXrNHY";
const G_URL = "https://developers.google.com/oauthplayground";
const oAuth = new googleapis_1.google.auth.OAuth2(G_ID, G_SECRET, G_URL);
oAuth.setCredentials({ access_token: G_REFRESH });
const URL = "http://localhost:1234";
const sendMail = (user, tokenID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAccess = (yield oAuth.getAccessToken()).token;
        const transport = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "elizabethokorie407@gmail.com",
                clientId: G_ID,
                clientSecret: G_SECRET,
                refreshToken: G_REFRESH,
                accessToken: getAccess,
            }
        });
        const userDetails = {
            name: user.name,
            email: user === null || user === void 0 ? void 0 : user.email,
            url: `${URL}/${tokenID}/verify`
        };
        const data = path_1.default.join(__dirname, "../views/verifyMail.ejs");
        const realData = yield ejs_1.default.renderFile(data, userDetails);
        const mail = {
            from: "verify <elizabethokorie407@gmail.com>",
            to: user.email,
            subject: "verify",
            html: realData
        };
        transport.sendMail(mail);
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendMail = sendMail;
