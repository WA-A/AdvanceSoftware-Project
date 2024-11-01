import { sequelize } from'../../DB/Connection.js';
import {  DataTypes } from'sequelize';

const RentalModel = sequelize.define('Item',{
    ItemId:{
        type:Number,
       required:true,  
    },
    RentalDays: {
        type: Number,
        required: true,
    },
    RentalDate: {
        type: Date,
        default: Date.now
    },
     ItemOwner: {
        type: Number, // Relation with User Model
        ref: 'User', 
        required: true
    },
    ItemTenant:{
        type: Number, // Relation with User Model
        ref: 'User', 
        required: true
    },
    finalCost: {
        type: Number,
        required: true,
        min: 0,
    }
    },
    {
     timestamps:true,
    }
);



export default RentalModel;