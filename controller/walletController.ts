import { Request, Response } from "express";
import { HTTP } from "../error/mainError";
import authModel from "../model/authModel";
import walletModel from "../model/walletModel";
import https from "https";

export const requestLoan = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { amount } = req.body;

    const user: any = await authModel.findById(userID);
    if (user) {
      if (user?.loaned === 0) {
        const wallet = await walletModel.create({
          amount: parseInt(amount),
          email: user.email,
        });

        let interestRate: any = amount * 0.026;

        let totalAmount = interestRate + amount;

        console.log(totalAmount);
        user.creditWallet += amount;
        user.loaned = -parseInt(totalAmount);
        await user.save();

        return res.status(HTTP.CREATE).json({
          message: "successfully requested loan",
          data: wallet,
        });
      } else {
        return res.status(HTTP.CREATE).json({
          message: "Please go and clear ur debt",
        });
      }
    } else {
      return res.status(HTTP.BAD).json({
        message: "error",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error",
      data: error.message,
    });
  }
};

export const payLoan = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { amount } = req.body;
    const user: any = await authModel.findById(userID);

    if (user?.loaned === 0 || user?.loaned > amount) {
      return res.status(HTTP.BAD).json({
        message: "Congrats you have completed your loan",
      });
    } else {
      const params = JSON.stringify({
        email: user?.email,
        amount: parseInt(amount) * 100,
        userID,
      });
      const options = {
        hostname: "api.paystack.co",
        port: 443,
        path: "/transaction/initialize",
        method: "POST",
        headers: {
          Authorization:
            "Bearer sk_test_ec1b0ccabcb547fe0efbd991f3b64b485903c88e",
          "Content-Type": "application/json",
        },
      };

      const ask = https
        .request(options, (resp) => {
          let data = "";
          resp.on("data", (chunk) => {
            data += chunk;
          });

          resp.on("end", () => {
            console.log(JSON.parse(data));
            res.status(HTTP.OK).json({
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
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error",
      data: error.message,
    });
  }
};

export const payLater = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { amount } = req.body;
    const user: any = await authModel.findById(userID);

    if (user?.creditWallet === 0 || amount > user?.creditWallet) {
      return res.status(HTTP.BAD).json({
        message: "Please check your credit wallet",
      });
    } else {
      const params = JSON.stringify({
        email: user?.email,
        amount: parseInt(amount) * 100,
        userID,
      });
      const options = {
        hostname: "api.paystack.co",
        port: 443,
        path: "/transaction/initialize",
        method: "POST",
        headers: {
          Authorization:
            "Bearer sk_test_ec1b0ccabcb547fe0efbd991f3b64b485903c88e",
          "Content-Type": "application/json",
        },
      };

      const ask = https
        .request(options, (resp) => {
          let data = "";
          resp.on("data", (chunk) => {
            data += chunk;
          });

          resp.on("end", () => {
            console.log(JSON.parse(data));
            res.status(HTTP.OK).json({
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
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error",
      data: error.message,
    });
  }
};

export const payNow = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { amount } = req.body;
    const user: any = await authModel.findById(userID);

    const params = JSON.stringify({
      email: user?.email,
      amount: parseInt(amount) * 100,
      userID,
    });
    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: "/transaction/initialize",
      method: "POST",
      headers: {
        Authorization:
          "Bearer sk_test_ec1b0ccabcb547fe0efbd991f3b64b485903c88e",
        "Content-Type": "application/json",
      },
    };

    const ask = https
      .request(options, (resp) => {
        let data = "";
        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          console.log(JSON.parse(data));
          res.status(HTTP.OK).json({
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
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error",
      data: error.message,
    });
  }
};
