import { DataTypes } from "sequelize";
import { sequelize } from "../../DB/Connection.js";

const DeliveryModel = sequelize.define("Delivery", {
  rentalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Rentals",
      key: "id",
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tenantAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ownerAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deliveryMethod: {
    type: DataTypes.ENUM("Third-Party", "Meet-Up"),
    allowNull: false,
    defaultValue: "Third-Party",
  },
  deliveryAddress: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  deliveryStatus: {
    type: DataTypes.ENUM("Pending", "In Transit", "Delivered"),
    allowNull: false,
    defaultValue: "Pending",
  },
  paymentStatus: {
    type: DataTypes.ENUM("unpaid", "paid"),
    allowNull: false,
    defaultValue: "unpaid",
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

export default DeliveryModel;
