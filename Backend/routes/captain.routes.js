import express from "express";
import { captainAuthMiddleware } from "../middlewares/auth.middleware.js";
const router = express.Router();
import {
  getCaptainProfile,
  registerCaptain,
  loginCaptain,
  logoutCaptain,
} from "../controllers/captain.controllers.js";
import { registerCaptainValidations } from "../validations/registerCaptainValidations.js";
import { loginCaptainValidations } from "../validations/loginCaptainValidations.js";

router.post("/register", registerCaptainValidations, registerCaptain);
router.post("/login", loginCaptainValidations, loginCaptain);
router.get("/profile", captainAuthMiddleware, getCaptainProfile);
router.get("/logout", captainAuthMiddleware, logoutCaptain);

export default router;
