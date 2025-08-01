'use strict';
const bcrypt = require('bcryptjs'); // Importa bcryptjs

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Hasheamos la contraseña directamente para evitar cualquier problema
    const hashedPassword = await bcrypt.hash('318614', 10);

    await queryInterface.bulkInsert('users', [{
      username: 'olimpoadmin',
      password: hashedPassword, // Insertamos la contraseña ya hasheada
      email: 'clubolimpo.rg@gmail.com',
      is_active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', { username: 'olimpoadmin' }, {});
  }
};
