import express from "express";
import {
  loginUser,
  registerUser,
  getUserProfile,
  logoutUser,
} from "../controllers/user.controllers.js";
import { registerUserValidations } from "../validations/registerUserValidations.js";
import { loginUserValidations } from "../validations/loginUserValidations.js";
import { userAuthMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUserValidations, registerUser);
router.post("/login", loginUserValidations, loginUser);
router.get("/profile", userAuthMiddleware, getUserProfile);
router.get("/logout", userAuthMiddleware, logoutUser);
export default router;
