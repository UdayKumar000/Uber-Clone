import { User } from "../models/user.model.js";

// Create a new user
export const createUser = async ({ fullname, gmail, password }) => {
  if (!fullname || !gmail || !password) {
    throw new Error("All fields are required");
  }
  const user = await User.create({ fullname, gmail, password });
  return user;
};
