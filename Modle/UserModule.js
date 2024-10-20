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
      SendCode:{
        type:String,
          default:null,
       },
     Address: {
        type: String,
        required: true
      },
      PhoneNumber: {
        type: String,
        required: true
      },
      Rating: {
        type: Number,
        default: 0, // Start From Zero
        min: 0,
        max: 5
      },
      verificationStatus: {
        type: Boolean,
        default: false 
      },
      Role:{
        type:String,
        default:'User',
        enum:['User','Admin'],
     }, 
    },
    {
     timestamps:true,
    }  
);


export default UserModel;