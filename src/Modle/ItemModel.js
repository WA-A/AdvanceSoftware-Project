import { sequelize } from'../../DB/Connection.js';
import {  DataTypes } from'sequelize';

const ItemModel = sequelize.define('Item',{
    NameItem:{
        type:String,
       required:true,  
    },
    Description: {
        type: String,
        required: true,
     },
     Category: {
        type: String,
        required: true,
        enum: ['Tools', 'Sports Equipment', 'Electronics', 'Furniture', 'Vehicles', 'Others'],  
        default: 'Others'
    },
    DailyPrice: {
        type: Number,
        required: true,
    },
    Status: {
        type: String,
        enum: ['Available', 'Rented'],
        default: 'Available'
    },
    RentalDays: {
        type: Date,
        default: Date.now
    },
     Image:{
      type:Object,
     },
     Owner: {
        type: Number, // Relation with User Model
        ref: 'User', 
        required: true
    },
    //  createdBy:{type:Types.ObjectId,ref:'User'},
    //  updatedBy:{type:Types.ObjectId,ref:'User'},
    },
    {
     timestamps:true,
    }
);



export default ItemModel;