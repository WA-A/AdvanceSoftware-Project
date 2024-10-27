import { where } from "sequelize";
import bcrypt from'bcryptjs';
import jwt from 'jsonwebtoken';
import { customAlphabet } from 'nanoid'; 
import UserModel from "../../Modle/UserModule.js";
import dotenv from 'dotenv';
dotenv.config();


export const GetAuth = (req,res)=>{
    return res.json({message:"Auth"});
}

export const Register = async (req,res)=>{
    try{
        const {Name,Email,Password,Address,PhoneNumber}= req.body;
        const HashedPassword = bcrypt.hashSync(Password,parseInt(process.env.SALTROUND));

        const InsertUser = await UserModel.create({Name,Email,Password:HashedPassword,Address,PhoneNumber}); // insert to table   == email:email,password:password,name:name  // key = name so write {email,password,name}
        const token = jwt.sign({Email},process.env.CONFIRM_EMAILTOKEN);

        return res.json({message:"success",InsertUser,status: 201});
    }
   catch(error){
    if(error.original?.errno == 1062){
        return res.json({message:"email already exists"});
    }
    return res.json({message:"error",error:error.stack});
   } 
  
}

export const Login = async (req, res) => {
    try {
      const { Email, Password } = req.body;
  
      
      const CheckUser = await UserModel.findOne({
        attributes: ["id", "Name","Password"],
        where: {
          Email,
        }
      });
  
      if (!CheckUser) {
        return res.json({ message: "email or password is wrong" });
      }
  
      const Match = await bcrypt.compare(Password,CheckUser.Password);
  
      
      if (!Match) {
        return res.status(400).json({ message: "Invalid data" });
      }
  
      const Token = jwt.sign({ id: CheckUser.id},process.env.LOGINSIG);  
  
      
      return res.json({ message: "success", user: CheckUser, Token });
  
    } 
    catch (error) {
      console.error("Error: ", error);  
      return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }
  
  
export const SendCode = async (req, res) => {
    const { Email } = req.body;
    const Code = customAlphabet('1234567890abcdef', 4)(); 
    try {
        const [updatedRows, updatedUser] = await UserModel.update(
            { SendCode: Code }, 
            {
                where: { Email }, 
                returning: true,   
            }
        )
        if (updatedRows === 0) {
            return res.status(400).json({ message: "Email not found" });
        }
        return res.status(200).json({ message: "Success", user: updatedUser[0],Code });
        
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

  
 

  

export const ForgotPassword = async (req, res) => {
    try {
        const { Email, Password, code } = req.body;

        const userResult = await UserModel.findOne({ where: { Email } });

        if (!userResult) {
            return res.status(404).json({ message: "User not found" });
        }

        if (userResult.SendCode !== code) {
            return res.status(400).json({ message: "Invalid code" });
        }

        const hashedPassword = await bcrypt.hash(Password, parseInt(process.env.SALTROUND));

        await UserModel.update(
            { Password: hashedPassword },
            { where: { Email } }
        );

        return res.status(200).json({ message: "Password updated successfully" });

    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};






 