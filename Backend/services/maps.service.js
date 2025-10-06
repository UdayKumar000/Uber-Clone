import axios from "axios";

export const getCoordinatesService = async (address) => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

    const response = await axios.get(url);
    const data = response.data;

    if (data.status === "OK") {
      const location = data.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    } else {
      throw new Error(`Geocoding API error: ${data.status}`);
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    throw error;
  }
};

export const getDistanceAndTimeService = async (origin, destination) => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
      origin
    )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    const response = await axios.get(url);
    const data = response.data;

    if (data.status === "OK") {
      const element = data.rows[0].elements[0];
      return {
        distance: element.distance,
        duration: element.duration,
      };
    } else {
      throw new Error(`Distance Matrix API error: ${data.status}`);
    }
  } catch (error) {
    console.error("Error fetching distance and time:", error.message);
    throw error;
  }
};

export const getSuggessionsService = async (input) => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      input
    )}&key=${apiKey}`;
    const response = await axios.get(url);
    const data = response.data;
    if (data.status === "OK") {
      return data.predictions;
    } else {
      throw new Error(`Places API error: ${data.status}`);
    }
  } catch (error) {
    console.error("Error fetching suggestions:", error.message);
    throw error;
  }
};
