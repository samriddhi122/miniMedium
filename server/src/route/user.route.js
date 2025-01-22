import {Router} from "express"
import { loginUser,logoutUser,registerUser } from "../controller/user.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()
router.route("/register").post(
    registerUser
)
router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT,  logoutUser)
router.route("/protected").get(verifyJWT,(req,res)=>{return res.status(200).json({message: "Protected route"})}
)
export default router