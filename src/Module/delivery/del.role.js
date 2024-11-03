import { Roles } from "../middlewares/auth.js";

const roleValidation = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.Role; // Ensure this matches the `Role` property format in auth middleware
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden: Access denied." });
    }
    next();
  };
};

export default roleValidation;
