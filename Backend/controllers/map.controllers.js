import {
  getCoordinatesService,
  getDistanceAndTimeService,
  getSuggessionsService,
} from "../services/maps.service.js";

export const getCoordinatesFromAddress = async (req, res) => {
  try {
    const { address } = req.query;
    if (!address) {
      return res
        .status(400)
        .json({ success: false, error: "Address query parameter is required" });
    }
    const coordinates = await getCoordinatesService(address);
    res.status(200).json({ success: true, coordinates });
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const getDistanceAndTime = async (req, res) => {
  try {
    const { origin, destination } = req.query;
    if (!origin || !destination) {
      return res.status(400).json({
        success: false,
        error: "Origin and Destination query parameters are required",
      });
    }
    const result = await getDistanceAndTimeService(origin, destination);
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Error fetching distance and time:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const getSuggessions = async (req, res) => {
  try {
    const { input } = req.query;
    if (!input) {
      return res
        .status(400)
        .json({ success: false, error: "Input query parameter is required" });
    }
    const suggestions = await getSuggessionsService(input);
    res.status(200).json({ success: true, suggestions });
  } catch (error) {
    console.error("Error fetching suggestions:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
