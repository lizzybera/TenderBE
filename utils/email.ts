import nodemailer from "nodemailer";
import { google } from "googleapis";
import path from "path"
import ejs from 'ejs'

const G_ID: string =
  "515997591712-h3d7e0p17ipjumbuusqs93f5boldtucr.apps.googleusercontent.com";
const G_SECRET: string = "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";
const G_REFRESH: string =
  "1//04Wc0f74tqzFuCgYIARAAGAQSNwF-L9Irdku-fajBIhK05UXlrAh8sZzFFiHRk3NCbjfDlo3yf_1umhcXijr8A-2nl2p4YSXrNHY";
const G_URL: string = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(G_ID, G_SECRET, G_URL);
oAuth.setCredentials({ access_token: G_REFRESH });

const URL : string = "http://localhost:1234"

export const sendMail = async (user: any, tokenID: any) => {

  try {
    const getAccess : any = (await oAuth.getAccessToken()).token

    const transport = nodemailer.createTransport({
        service : "gmail",
        auth : {
            type : "OAuth2",
            user : "elizabethokorie407@gmail.com",
            clientId : G_ID,
            clientSecret : G_SECRET,
            refreshToken : G_REFRESH,
            accessToken : getAccess,
        }
    })

    const userDetails = {
        name : user.name,
        email : user?.email,
        url : `${URL}/${tokenID}/verify`
    }

    const data = path.join(__dirname, "../views/verifyMail.ejs")

    const realData = await ejs.renderFile(data, userDetails)

    const mail = {
        from : "verify <elizabethokorie407@gmail.com>",
        to : user.email,
        subject : "verify",
        html : realData
    }

    transport.sendMail(mail)

} catch (error) {
    console.log(error);
    
}
};
