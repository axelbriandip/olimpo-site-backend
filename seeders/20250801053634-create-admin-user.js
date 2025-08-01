'use strict';

// La ruta correcta para acceder a los modelos desde la carpeta 'seeders'
// es '../src/models'
const db = require('../src/models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Usamos el método `create()` del modelo 'User' que está en el objeto 'db'.
     * Esto ejecutará los hooks de Sequelize definidos en tu modelo (como el hasheo
     * de la contraseña) antes de insertarlo en la base de datos.
     */
    await db.User.create({
      username: 'olimpoadmin',
      password: '318614', // La contraseña se hasheará automáticamente.
      email: 'clubolimpo.rg@gmail.com',
      is_active: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * El método 'down' para deshacer los cambios, si es necesario.
     */
    await queryInterface.bulkDelete('users', { username: 'olimpoadmin' }, {});
  }
};
