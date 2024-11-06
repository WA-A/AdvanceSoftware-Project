import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

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

// Custom method to get deliveries by user ID
DeliveryModel.getDeliveriesByUserId = async function (userId) {
  return await this.findAll({
    where: {
      userId,
    },
  });
};

// Custom method to update delivery status
DeliveryModel.updateDeliveryStatus = async function (deliveryId, newStatus) {
  return await this.update(
    { deliveryStatus: newStatus },
    { where: { id: deliveryId } }
  );
};

// Custom method to update payment status
DeliveryModel.updatePaymentStatus = async function (deliveryId, newStatus) {
  return await this.update(
    { paymentStatus: newStatus },
    { where: { id: deliveryId } }
  );
};

// Custom method to update delivery details
DeliveryModel.updateDeliveryDetails = async function (deliveryId, updatedFields) {
  return await this.update(updatedFields, {
    where: { id: deliveryId },
  });
};

export default DeliveryModel;
