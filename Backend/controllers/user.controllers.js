import { User } from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { Blacklist } from "../models/blacklist.model.js";

export const registerUser = async (req, res) => {
  const { fullname, gmail, password } = req.body;
  const isUserAlreadyExist = await User.findOne({ gmail });
  if (isUserAlreadyExist) {
    return res.status(400).json({ errors: "User already exist" });
  }
  const hashedPassword = await User.hashPassword(password);

  const user = await createUser({ fullname, gmail, password: hashedPassword });
  const token = user.generateAuthToken();
  return res.status(201).json({
    token,
    message: "User registered successfully",
    user,
  });
};

export const loginUser = async (req, res) => {
  const { gmail, password } = req.body;
  const user = await User.findOne({ gmail }).select("+password");
  if (!user) {
    return res.status(401).json({ errors: "Invalid email or password" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ errors: "Invalid email or password" });
  }
  const token = user.generateAuthToken();
  return res.status(200).json({
    token,
    message: "User logged in successfully",
    user,
  });
};
export const getUserProfile = async (req, res) => {
  return res.status(200).json({ user: req.user });
};
export const logoutUser = async (req, res) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "Already logged out" });
  }
  await Blacklist.create({ token });
  return res.status(200).json({ message: "User logged out successfully" });
};
