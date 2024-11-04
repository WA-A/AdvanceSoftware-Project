import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"; // Update the path as necessary

const DeliveryModel = sequelize.define("Delivery", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  rentalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Rentals", // Assuming you have a Rentals model defined
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
    allowNull: true, // Required if "Third-Party" is selected
  },
  meetUpLocation: {
    type: DataTypes.STRING,
    allowNull: true, // Used for "Meet-Up"
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

DeliveryModel.getDeliveriesByUserId = async function (userId) {
  return await this.findAll({
    where: {
      userId,
    },
  });
};


DeliveryModel.updateDeliveryStatus = async function (deliveryId, newStatus) {
  return await this.update(
    { deliveryStatus: newStatus },
    { where: { id: deliveryId } }
  );
};


export default DeliveryModel;
