'use strict';
import { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(12);

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, { foreignKey: 'role_id', as: 'roleData' });
    }

    async hashPassword() {
      this.password = await bcrypt.hash(this.password, salt);
    }

    static async matchPassword(password, instance) {
      return await bcrypt.compare(password, instance.password);
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      full_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            await user.hashPassword();
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed('password')) {
            await user.hashPassword();
          }
        },
      },
    },
  );
  return User;
};
