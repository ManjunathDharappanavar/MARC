import User from "../models/User.js";
import generateToken from "../utils/jwt.js";

export const registerUser = async (req, res) => {
  const user = await User.create(req.body);
  res.json({
    _id: user._id,
    name: user.name,
    role: user.role,
    token: generateToken(user._id)
  });
};

export const getProfile = (req, res) => {
  res.json(req.user);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      role: user.role,
      token: generateToken(user._id)
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
