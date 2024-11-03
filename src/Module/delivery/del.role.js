const roleValidation = (roles) => {
    return (req, res, next) => {
      const userRole = req.user.role; 
      if (!roles.includes(userRole)) {
        return res.status(403).json({ message: "Forbidden: Access denied." });
      }
      next();
    };
  };
  
  export default roleValidation;
  