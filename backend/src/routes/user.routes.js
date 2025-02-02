import {Router} from "express"
const router=Router()
import { verifyJwt } from "../middlewares/user.middleware.js"
import {loginUser, registerUser} from "../controllers/user.controller.js"

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/books").get(verifyJwt,loginUser)
router.route("/logout").get(verifyJwt,loginUser)
export default router