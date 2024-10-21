import UserModel from "../../Modle/UserModule.js";


export const GetUsers = async (req, res) => {
    try {
        const users = await UserModel.findAll(); 
        return res.status(200).json({ message: "success", users });
    } catch (error) {
        return res.status(500).json({ message: "Error fetching users", error: error.message });
    }
}



export const GetDataUser = async (req, res) => {
    try {
        const user = req.user; 
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "success", user});
    } catch (error) {
        console.error("Error fetching user data:", error);
        return res.status(500).json({ message: "Error fetching user data", error: error.message });
    }
};



