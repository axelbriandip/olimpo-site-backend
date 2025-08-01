'use strict';
const db = require('../models'); // Importamos la conexión a la base de datos
const User = require('../models/user')(db.sequelize, db.Sequelize.DataTypes); // Importamos el modelo de Usuario directamente

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * El método 'up' ahora usa el modelo User importado directamente.
     * Esto asegura que el hook de hasheo de la contraseña se ejecute sin importar
     * la configuración del archivo models/index.js.
     */
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
