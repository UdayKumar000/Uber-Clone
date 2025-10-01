import { checkSchema, validationResult } from "express-validator";

const createUserSchema = checkSchema({
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
  gmail: {
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
});

const validate = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array()[0].msg });
  }
  next();
};

export const registerUserValidations = [createUserSchema, validate];
