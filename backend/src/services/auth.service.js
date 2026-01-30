const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../utils/jwt");

exports.register = async (data) => {
  const hashed = await bcrypt.hash(data.password, 10);
  const user = await User.create({ ...data, password: hashed });
  return user;
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw "User not found";

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw "Invalid credentials";

  const token = generateToken({ id: user._id, role: user.role });
  return { user, token };
};
