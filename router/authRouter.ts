import { Router } from "express";
import { deleteUser, registerUser, signInUser, verifyUser, viewAllUser } from "../controller/authController";

const router = Router()

router.route("/view").get(viewAllUser)

router.route("/reg").post(registerUser)
router.route("/sign").post(signInUser)
router.route("/:token/verify").patch(verifyUser)
router.route("/:userID/delete").delete(deleteUser)

export default router