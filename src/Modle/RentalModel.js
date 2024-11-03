import { sequelize } from "../../DB/Connection.js";
import { DataTypes } from "sequelize";

const RentalModel = sequelize.define(
  "Rental",
  {
    RentalDays: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    RentalDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    Item: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Items",
        key: "id",
      },
    },
    ItemOwner: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    ItemTenant: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    FinalCost: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    Status: {
      type: DataTypes.ENUM,
      values: ["pending", "confirmed", "completed", "cancelled"],
      defaultValue: "pending",
      allowNull: false,
    },
    PaymentStatus: {
      type: DataTypes.STRING,
      defaultValue: "unpaid", // possible values: "unpaid", "paid", "refunded"
    },
  },
  {
    timestamps: true,
  }
);

export default RentalModel;
