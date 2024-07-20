'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        static associate(models) {
            // define association here
            Order.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
            Order.belongsTo(models.PaymentMethod, { foreignKey: 'payment_method_id', as: 'payment_method' });
        }
    }
    Order.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
            },
            payment_method_id: {
                type: DataTypes.INTEGER,
            },
            payment_order_id: {
                type: DataTypes.UUID,
                unique: true
            },
            transaction_date: {
                type: DataTypes.STRING,
            },
            customer_name: {
                type: DataTypes.STRING,
            },
            customer_phone: {
                type: DataTypes.STRING,
            },
            status: {
                type: DataTypes.ENUM('PAID', 'UNPAID'),
                defaultValue: 'UNPAID',
            },
            amount: {
                type: DataTypes.BIGINT,
            },
            currency: {
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            modelName: 'Order',
            tableName: 'orders',
            timestamps: true,
        },
    );
    return Order;
};
