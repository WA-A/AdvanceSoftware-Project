import { sequelize } from "../../DB/Connection.js";
import { DataTypes } from "sequelize";

const ItemModel = sequelize.define(
  "Item",
  {
    NameItem: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Category: {
      type: DataTypes.ENUM,
      values: [
        "Tools",
        "Sports Equipment",
        "Electronics",
        "Furniture",
        "Vehicles",
        "Others",
      ],
      defaultValue: "Others",
      allowNull: false,
    },
    DailyPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Status: {
      type: DataTypes.ENUM,
      values: ["Available", "Rented"],
      defaultValue: "Available",
    },
    RentalDays: {
      type: DataTypes.INTEGER,
      allowNull: false, // Assuming this must not be null
    },
    Image: {
      type: DataTypes.JSON,
    },
    Owner: {
      // Add this field to reference the user
      type: DataTypes.INTEGER,
      allowNull: false, // Set to true if you want to enforce this
      references: {
        model: "Users", // Adjust based on the actual name of your users table
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default ItemModel;

// import { sequelize } from'../../DB/Connection.js';
// import {  DataTypes } from'sequelize';

// const ItemModel = sequelize.define('Item',{
//     NameItem:{
//         type:String,
//        required:true,
//     },
//     Description: {
//         type: String,
//         required: true,
//      },
//      Category: {
//         type: String,
//         required: true,
//         enum: ['Tools', 'Sports Equipment', 'Electronics', 'Furniture', 'Vehicles', 'Others'],
//         default: 'Others'
//     },
//     DailyPrice: {
//         type: Number,
//         required: true,
//     },
//     Status: {
//         type: String,
//         enum: ['Available', 'Rented'],
//         default: 'Available'
//     },
//     RentalDays: {
//         type: Date,
//         default: Date.now
//     },
//      Image:{
//       type:Object,
//      },
//      Owner: {
//         type: Number, // Relation with User Model
//         ref: 'User',
//         required: true
//     },
//     //  createdBy:{type:Types.ObjectId,ref:'User'},
//     //  updatedBy:{type:Types.ObjectId,ref:'User'},
//     },
//     {
//      timestamps:true,
//     }
// );

// export default ItemModel;
