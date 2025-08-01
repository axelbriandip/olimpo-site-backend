'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * El método 'up' se encarga de aplicar los cambios (crear el usuario).
     *
     * La contraseña se hasheará automáticamente gracias al hook 'beforeCreate'
     * definido en tu modelo de usuario (src/models/user.model.js).
     */
    await queryInterface.bulkInsert('users', [{
      username: 'olimpoadmin', // Nombre de usuario para el login
      password: '318614', // La contraseña de texto plano que se hasheará
      email: 'clubolimpo.rg@gmail.com', // Email para el usuario admin
      is_active: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * El método 'down' se usa para deshacer los cambios, si es necesario.
     * En este caso, elimina el usuario que creamos.
     */
    await queryInterface.bulkDelete('users', { username: 'olimpoadmin' }, {});
  }
};
