'use strict';
const db = require('../models'); // Importa tu conexión de modelos

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * El método 'up' ahora usa User.create() para asegurar que los hooks del modelo
     * (como el hasheo de la contraseña) se ejecuten correctamente.
     */
    const User = db.User; // Accede al modelo de usuario

    // Crea el usuario usando el método del modelo
    await User.create({
      username: 'olimpoadmin',
      password: '318614', // La contraseña se hasheará automáticamente
      email: 'clubolimpo.rg@gmail.com',
      is_active: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * El método 'down' se usa para deshacer los cambios, si es necesario.
     * En este caso, elimina el usuario que creamos.
     */
    await queryInterface.bulkDelete('users', { username: 'olimpoadmin' }, {});
  }
};
