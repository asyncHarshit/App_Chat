import express from "express";
import { login, logout, signup} from "../controller/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { updateProfile } from "../controller/auth.controller.js";
import { checkAuth } from "../controller/auth.controller.js";




const router = express.Router();

router.post("/login",login)
router.post("/logout",logout)
router.post("/signup",signup)

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check" , protectRoute , checkAuth);





export default router;
