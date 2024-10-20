import UserModel from '../Modle/UserModule.js';

export const CheckEmail = async (req, res, next) => {
    const { Email } = req.body;

    try {
       
        const user = await UserModel.findOne({
            where: { Email }
        });

        
        if (user) {
            return res.status(409).json({ message: "Email already exists" });
        }

        
        next();
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};