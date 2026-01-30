import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/AppError.js";

export const registerUser = catchAsync(async (req, res, next) => {
  const { name, email, password, adminSecret } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return next(new AppError("All fields required", 400));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError("User already exists", 400));
  }

  // 🔐 Admin secret check
  const role =
    adminSecret && adminSecret === process.env.ADMIN_SECRET ? "admin" : "user";

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token: generateToken(user),
  });
});

export const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role, // Added email to match register/profile
      token: generateToken(user),
    });
  } else {
    return next(new AppError("Invalid credentials", 401));
  }
});

export const getProfile = catchAsync(async (req, res, next) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email, // Ensure email is included
    role: req.user.role,
  };
  res.status(200).json(user);
});
