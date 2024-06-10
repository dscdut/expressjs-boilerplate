'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('users', 'role', 'role_id');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('users', 'role_id', 'role');
  },
};
