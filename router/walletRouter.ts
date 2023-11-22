import { Router } from "express";
import { payLater, payLoan, payNow, requestLoan } from "../controller/walletController";

const wallet = Router()

wallet.route("/:userID/request-loan").post(requestLoan)
wallet.route("/:userID/pay-loan").post(payLoan)
wallet.route("/:userID/pay-later").post(payLater)
wallet.route("/:userID/pay-now").post(payNow)

export default wallet