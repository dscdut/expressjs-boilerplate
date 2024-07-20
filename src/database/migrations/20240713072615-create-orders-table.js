'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      payment_method_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      payment_order_id: {
        type: Sequelize.UUIDV4,
        unique: true
      },
      transaction_date: {
        type: Sequelize.STRING,
      },
      customer_name: {
        type: Sequelize.STRING,
      },
      customer_phone: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM('PAID', 'UNPAID'),
        defaultValue: 'UNPAID',
      },
      amount: {
        type: Sequelize.BIGINT,
      },
      currency: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};
