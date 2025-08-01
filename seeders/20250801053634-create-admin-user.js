'use strict';
const bcrypt = require('bcryptjs'); // Necesitas importar bcryptjs para hashear

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Definir la contraseña de texto plano
    const password = '318614';

    // 2. Hashear la contraseña de forma segura
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Insertar el usuario con la contraseña ya hasheada
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
