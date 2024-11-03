import jwt from "jsonwebtoken";
import UserModel from "./../Modle/UserModule.js";

export const auth = (AccessRole = []) => {
  return async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith(process.env.BEARERKEY)) {
      return res.status(401).json({ message: "Token missing or incorrect format" });
    }

    const token = authorization.replace(process.env.BEARERKEY, "").trim();

    try {
      const decoded = jwt.verify(token, process.env.LOGINSIG);
      const authUser = await UserModel.findByPk(decoded.id, {
        attributes: ["Name", "Role", "id"],
      });

      if (!authUser) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!AccessRole.includes(authUser.Role)) {
        return res.status(403).json({ message: "Not authorized user" });
      }

      req.user = authUser;
      next();
    } catch (error) {
      return res.status(400).json({ message: "Invalid authorization" });
    }
  };
};
