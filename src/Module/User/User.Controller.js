import UserModel from "../../Modle/UserModule.js";


export const GetUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll(); 
        return res.status(200).json({ message: "success", users });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};





