import UserModel from "../../Modle/UserModule.js";


export const Update = async (req,res)=>{
    try{
    const {id} = req.params;
    const {Name} = req.body;

    const user = await UserModel.update({Name},{where:{id}});

        if(!user){
            return res.json({message:"user not found"});
        }
    
        return res.json({message:"success",users:user});
    }
    catch(error){
        return res.json({message:"error",error:error.stack});
    } 
 }

 export const GetUsers = async (req,res)=>{

 }


 export const Delete = async (req,res)=>{
    const {id} = req.params;
    const user = await UserModel.destroy({
        where:{
            id
        }
    });

    if(!user){
        return res.json({message:"user not found"});
    }

    return res.json({message:"success",user});
 }