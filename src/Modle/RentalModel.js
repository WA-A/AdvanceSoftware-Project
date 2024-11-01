import { sequelize } from'../../DB/Connection.js';
import {  DataTypes } from'sequelize';

const RentalModel = sequelize.define('Item',{
    RentalDays: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    RentalDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    ItemOwner: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    ItemTenant: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    finalCost: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0
        }
    }
}, {
    timestamps: true
});



export default RentalModel;