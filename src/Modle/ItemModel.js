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
    // RentalDays: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    Image: {
      type: DataTypes.STRING,
    },
    Owner: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default ItemModel;
