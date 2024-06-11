'use strict';

/** @type {import('sequelize-cli').Migration} */

//123456Aa@
const DEFAULT_PASSWORD = '$2a$12$ewKpOMQpg7Ctj5bUb2mbBe2vvznInOUoZ2TyUcEvxYlXwrTg.UhaG';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          full_name: 'admin',
          email: 'admin@gmail.com',
          password: DEFAULT_PASSWORD,
          role_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          full_name: 'user 01',
          email: 'user01@gmail.com',
          password: DEFAULT_PASSWORD,
          role_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          full_name: 'user 02',
          email: 'user02@gmail.com',
          password: DEFAULT_PASSWORD,
          role_id: 2,
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
