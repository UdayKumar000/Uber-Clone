import { Ride } from "../models/ride.model.js";
import { getDistanceAndTimeService } from "./maps.service.js";
import crypto from "crypto";

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Invalid pickup or destination");
  }

  const distanceTime = await getDistanceAndTimeService(pickup, destination);

  if (
    !distanceTime ||
    !distanceTime.distance.value ||
    !distanceTime.duration.value
  ) {
    throw new Error("Unable to calculate distance and time");
  }

  const vehicleTypes = ["auto", "moto", "car"];
  const fares = {};
  for (const vehicleType of vehicleTypes) {
    fares[vehicleType] = calculateFare(
      distanceTime.distance.value / 1000, // Convert meters to kilometers
      distanceTime.duration.value / 60, // Convert seconds to minutes
      vehicleType
    );
  }

  return fares;
}

function calculateFare(distance, time, vehicleType) {
  const baseFares = {
    auto: 30, // Base fare for auto
    moto: 20, // Base fare for bike
    car: 50, // Base fare for car
  };

  const costPerKm = {
    auto: 8, // Cost per kilometer for auto
    moto: 5, // Cost per kilometer for bike
    car: 12, // Cost per kilometer for car
  };

  const costPerMinute = {
    auto: 1, // Cost per minute for au to
    moto: 0.5, // Cost per minute for bike
    car: 2, // Cost per minute for car
  };

  if (
    !baseFares[vehicleType] ||
    !costPerKm[vehicleType] ||
    !costPerMinute[vehicleType]
  ) {
    throw new Error("Invalid vehicle type");
  }

  return (
    baseFares[vehicleType] +
    distance * costPerKm[vehicleType] +
    time * costPerMinute[vehicleType]
  );
}

function generateOtp(length) {
  if (!Number.isInteger(length) || length <= 0) {
    throw new Error("Length must be a positive integer");
  }

  const otp = crypto.randomInt(Math.pow(10, length - 1), Math.pow(10, length));
  return otp.toString();
}

export const createRide = async ({
  user,
  pickup,
  destination,
  vehicalType,
}) => {
  if (!user || !pickup || !destination || !vehicalType) {
    throw new Error("Missing required fields");
  }
  const fare = await getFare(pickup, destination);

  const ride = await Ride.create({
    user,
    pickup,
    destination,
    fare: fare[vehicalType],
    otp: generateOtp(6),
  });

  return ride;
};
