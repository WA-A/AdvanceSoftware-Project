import { sequelize } from '../../DB/Connection.js';
import { DataTypes } from 'sequelize';

const UserModel = sequelize.define('User', {
    Name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    IsDeleted: { // delete user and may return after delete
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    SendCode: {
        type: DataTypes.STRING,
        defaultValue: null
    },
    Address: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    PhoneNumber: {
        type: DataTypes.STRING,
        allowNull: false 
    },
    Rating: {
        type: DataTypes.INTEGER, 
        defaultValue: 0, // Start From Zero
        validate: {
            min: 0,
            max: 5
        },
        allowNull: true
    },
    verificationStatus: {
        type: DataTypes.BOOLEAN, 
        defaultValue: false,
        allowNull: true
    },
    Role: {
        type: DataTypes.ENUM('User', 'Admin'), 
        defaultValue: 'User',
        allowNull: true
    }
}, {
    timestamps: true,
});

export default UserModel;
