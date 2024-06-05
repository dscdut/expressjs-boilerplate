'use strict';

/** @type {import('sequelize-cli').Migration} */

//123456
const DEFAULT_PASSWORD = '$2a$10$ALnygnWxgJn4bAB9n.t6qeV56qv11O0O0PffkuimtW1/Rs8cNNYY6';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          full_name: 'admin',
          email: 'admin@gmail.com',
          password: DEFAULT_PASSWORD,
          role: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          full_name: 'user 01',
          email: 'user01@gmail.com',
          password: DEFAULT_PASSWORD,
          role: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          full_name: 'user 02',
          email: 'user02@gmail.com',
          password: DEFAULT_PASSWORD,
          role: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
