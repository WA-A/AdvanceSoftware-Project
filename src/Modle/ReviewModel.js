import { sequelize } from "../../DB/Connection.js";
import { DataTypes } from "sequelize";

const ReviewModel = sequelize.define(
  "Review",
  {
    ReviewText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    ItemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Items",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default ReviewModel;
