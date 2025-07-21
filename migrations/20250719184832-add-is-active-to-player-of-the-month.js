// migrations/YYYYMMDDHHMMSS-add-is-active-to-player-of-the-month.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Lógica para añadir la columna 'is_active'
    await queryInterface.addColumn('PlayerOfTheMonths', 'is_active', {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false, // O true si permites que sea nulo
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Lógica para revertir la adición de la columna (eliminarla)
    await queryInterface.removeColumn('PlayerOfTheMonths', 'is_active');
  }
};