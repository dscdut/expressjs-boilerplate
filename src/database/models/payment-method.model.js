'use strict';
import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    class PaymentMethod extends Model {
        static associate(models) {
            // define association here
            PaymentMethod.hasMany(models.Order, { foreignKey: 'payment_method_id', as: 'payment_method' });
        }
    }
    PaymentMethod.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'PaymentMethod',
            tableName: 'payment_methods',
            timestamps: true,
        },
    );
    return PaymentMethod;
};
