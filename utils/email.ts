import nodemailer from "nodemailer";
import { google } from "googleapis";

const G_ID: string =
  "403139932252-k0ksvgd56ohc39lsckt5bt3oquahgnvb.apps.googleusercontent.com";
const G_SECRET: string = "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";
const G_REFRESH: string =
  "1//04bsN5npSCiQqCgYIARAAGAQSNwF-L9Irifs6Ypy-8tdvnhCU0OPHZDjC8st6x82OOKEzVryQnYpRCh6rzl-4DLsGrrkA7var9dI";
const G_URL: string = "https://developers.google.com/oauthplayground";

const oAuth = new google.auth.OAuth2(G_ID, G_SECRET, G_URL);
oAuth.setCredentials({ access_token: G_REFRESH });

export const sendMail = async (user: any, token: any) => {
  try {
    const accessToken: any = (await oAuth.getAccessToken()).token;
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "cfoonyemmemme@gmail.com",
        clientId: G_ID,
        clientSecret: G_SECRET,
        refreshToken: G_REFRESH,
        accessToken,
      },
    });

    const baseUrl: string = `http://localhost:1000/api/${token}/verify`;

    const mailer = {
      from: "crowdPro💡💡 <cfoonyemmemme@gmail.com>",
      to: user.email,
      subject: "Verify Mail",
      html: `<p>
      We are very pleased to see you
      <br />
      register with us
      <br />
      <a href="${baseUrl}">verify</a>
      </p>`,
    };

    transport.sendMail(mailer);
  } catch (error: any) {
    console.log(error);
  }
};
