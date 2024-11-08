import { sequelize } from "../../DB/Connection.js";
import { DataTypes } from "sequelize";

const PaymentModel = sequelize.define("Payment",
  {
    RentalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Rentals", key: "id" },
    },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    currency: { type: DataTypes.STRING, defaultValue: "USD" },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending", // "pending", "completed", "failed"
    },
    paymentIntentId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default PaymentModel;
