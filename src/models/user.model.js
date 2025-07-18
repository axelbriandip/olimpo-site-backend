// src/models/user.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Asume que db.js está en config/
const bcrypt = require('bcryptjs'); // Necesitaremos bcrypt para hashear contraseñas

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // El nombre de usuario debe ser único
        validate: {
            notEmpty: true,
            len: [3, 50], // Longitud mínima de 3, máxima de 50
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [6, 255], // Longitud mínima de 6
        },
    },
    // Podrías añadir un campo para el email si lo necesitas para recuperación de contraseña, etc.
    email: {
        type: DataTypes.STRING,
        allowNull: true, // O false si es obligatorio
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    timestamps: true, // Para createdAt y updatedAt
    tableName: 'users', // Nombre de la tabla en la base de datos
    hooks: {
        // Hook para hashear la contraseña antes de guardar el usuario
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10); // Genera un salt
                user.password = await bcrypt.hash(user.password, salt); // Hashea la contraseña
            }
        },
        beforeUpdate: async (user) => {
            // Solo hashea la contraseña si ha sido modificada
            if (user.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
    },
});

// Método de instancia para comparar contraseñas
User.prototype.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;