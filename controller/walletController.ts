import { Request, Response } from "express";
import { HTTP } from "../error/mainError";
import authModel from "../model/authModel";
import walletModel from "../model/walletModel";

export const requestLoan = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const { amount } = req.body;

    const user:any = await authModel.findById(userID);
    if (user) {
      const wallet = await walletModel.create({
        amount: parseInt(amount),
        email: user.email,
      });

      let interestRate:any = amount * 0.026

      let totalAmount = interestRate + amount

      console.log(totalAmount)
      user.creditWallet += amount;
      user.loan = -parseInt(totalAmount)
      await user.save();

      return res.status(HTTP.CREATE).json({
        message: "successfully requested loan",
        data: wallet,
      });
    } else {
      return res.status(HTTP.BAD).json({
        message: "error",
      });
    }
  } catch (error: any) {
    return res.status(HTTP.BAD).json({
      message: "error registering user",
      data: error.message,
    });
  }
};


