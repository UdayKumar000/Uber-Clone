import express from "express";
import { userAuthMiddleware } from "../middlewares/auth.middleware.js";
import { query } from "express-validator";
import {
  getCoordinatesFromAddress,
  getDistanceAndTime,
  getSuggessions,
} from "../controllers/map.controllers.js";
const router = express.Router();

router.get(
  "/get-coordinates",
  [
    query("address")
      .isLength({ min: 3 })
      .isString()
      .notEmpty()
      .withMessage("Address is required"),
  ],
  userAuthMiddleware,
  getCoordinatesFromAddress
);
router.use(
  "/get-distance-time",
  [
    query("origin").isString().notEmpty().withMessage("Origin is required"),
    query("destination")
      .isString()
      .notEmpty()
      .withMessage("Destination is required"),
  ],
  userAuthMiddleware,
  getDistanceAndTime
);
router.get("/get-suggestions", userAuthMiddleware, getSuggessions);

export default router;
