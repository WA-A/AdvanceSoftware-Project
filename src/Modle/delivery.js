import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"; 

const DeliveryModel = sequelize.define("Delivery", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  deliveryAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deliveryStatus: {
    type: DataTypes.ENUM("Pending", "In Transit", "Delivered"),
    allowNull: false,
    defaultValue: "Pending",
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

// Associations
DeliveryModel.associate = (models) => {
  DeliveryModel.belongsTo(models.Rental, { foreignKey: "rentalId", as: "rental" });
};

export default DeliveryModel;
