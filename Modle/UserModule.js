import { sequelize } from'../DB/Connection.js';
import {  DataTypes } from'sequelize';


const UserModel = sequelize.define('User',{
    Name:{
       type:DataTypes.STRING(100),
       allowNull:false
    },
    Email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
     },
     Password:{
      type:DataTypes.STRING,
      allowNull:false
   },
     Age:{
         type:DataTypes.INTEGER
     },
    
    },
    {
     timestamps:true,
    }  
);


export default UserModel;