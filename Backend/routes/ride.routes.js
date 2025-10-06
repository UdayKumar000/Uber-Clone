import express from "express";
import { body } from "express-validator";
import { createRideController } from "../controllers/ride.controllers.js";
import { userAuthMiddleware } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post(
  "/create-ride",
  userAuthMiddleware,
  body("pickup")
    .notEmpty()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Pickup location is required"),
  body("destination")
    .notEmpty()
    .isString()
    .isLength({ min: 3 })
    .withMessage("Destination is required"),
  body("vehicalType").notEmpty().isString().withMessage("Invalid vehicle type"),
  createRideController
);

export default router;
