// Order model definition

import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database';

export const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    items: {
        type: DataTypes.JSON,
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending'
    }
}, {
    tableName: 'orders'
});
