import { Roles } from "../middlewares/auth.js";

const roleValidation = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.Role; 
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Forbidden: Access denied." });
    }
    next();
  };
};

export default roleValidation;
