import { AppError } from "../utils/AppError.js";

const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(
      new AppError("You do not have permission to perform this action", 403)
    );
  }
  next();
};

export default adminOnly;
