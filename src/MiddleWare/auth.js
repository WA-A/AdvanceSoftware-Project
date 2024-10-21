import jwt from 'jsonwebtoken';
import UserModel from './../Modle/UserModule.js'; 

export const Roles = {
    Admin: 'Admin',
    User: 'User'
}

export const auth = (AccessRole = []) => {
    return async (req, res, next) => {
        const { authorization } = req.headers;

        if (!authorization || !authorization.startsWith(process.env.BEARERKEY)) {
            return next(new Error(`Invalid token`, 401));
        }

        const token = authorization.split(process.env.BEARERKEY)[1];

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.LOGINSIG);
        } catch (error) {
            return res.status(400).json({ message: "Invalid authorization" });
        }

        try {
            const authUser = await UserModel.findByPk(decoded.id, {
                attributes: ['Name', 'Role'] 
            });

            if (!authUser) {
                return res.status(404).json({ message: 'User Not found' });
            }

            if (!AccessRole.includes(authUser.Role)) {
                return res.status(403).json({ message: "Not authorized User" });
            }

            req.user = authUser;
            next();
        } catch (error) {
            return res.status(500).json({ message: "Internal server error", error: error.message });
        }
    }
}
