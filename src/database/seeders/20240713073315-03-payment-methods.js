'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'payment_methods',
      [
        {
          name: 'MOMO',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'VNPAY',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('payment_methods', null, {});
  },
};
