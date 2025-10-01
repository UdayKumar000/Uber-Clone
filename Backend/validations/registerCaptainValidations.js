import { checkSchema, validationResult } from "express-validator";

const registerCaptainSchema = checkSchema({
  "fullname.firstname": {
    in: ["body"],
    notEmpty: {
      errorMessage: "First name is required",
    },
    isString: {
      errorMessage: "First name must be a string",
    },
    trim: true,
  },
  "fullname.lastname": {
    in: ["body"],
    optional: true,
    isString: {
      errorMessage: "Last name must be a string",
    },
    trim: true,
  },
  email: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Email is required",
    },
    isEmail: {
      errorMessage: "Invalid email format",
    },
    trim: true,
  },
  password: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Password is required",
    },
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters long",
    },
  },
  "vehicle.color": {
    in: ["body"],
    notEmpty: {
      errorMessage: "Color is required",
    },
    isString: {
      errorMessage: "Color must be a string",
    },
    trim: true,
  },
  "vehicle.plate": {
    in: ["body"],
    notEmpty: {
      errorMessage: "Plate is required",
    },
    isString: {
      errorMessage: "Plate must be a string",
    },
    trim: true,
  },
  "vehicle.capacity": {
    in: ["body"],
    notEmpty: {
      errorMessage: "Capacity is required",
    },
    isInt: {
      options: { min: 1 },
      errorMessage: "Capacity must be at least 1",
    },
  },
  "vehicle.vehicleType": {
    in: ["body"],
    notEmpty: {
      errorMessage: "Vehicle type is required",
    },
    isIn: {
      options: [["car", "motorcycle", "auto"]],
      errorMessage: "Invalid vehicle type must be car, motorcycle, or auto",
    },
  },
});

const validate = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array()[0].msg });
  }
  next();
};

export const registerCaptainValidations = [registerCaptainSchema, validate];
