import { createRide } from "../services/ride.service.js";
import { validationResult } from "express-validator";

export const createRideController = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  try {
    if (!req.user) {
      return res.status(401).json({ errors: "Unauthorized" });
    }
    const { pickup, destination, vehicalType } = req.body;
    const ride = await createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicalType,
    });
    return res.status(201).json(ride);
  } catch (error) {
    console.error("Error creating ride:", error.message);
    return res.status(500).json({ errors: "Server error" });
  }
};
