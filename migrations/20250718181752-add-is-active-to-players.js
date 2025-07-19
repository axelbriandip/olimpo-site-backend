// XXXXXXXXXXXXXX-add-is-active-to-players.js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Players', 'is_active', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false, // O true si quieres que pueda ser nulo
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Players', 'is_active');
  }
};