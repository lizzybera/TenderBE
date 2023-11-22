import { Router } from "express";
import { requestLoan } from "../controller/walletController";

const wallet = Router()

wallet.route("/:userID/request-loan").post(requestLoan)

export default wallet