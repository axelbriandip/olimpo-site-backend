'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Orden de creación de tablas: primero las que no tienen FKs, luego las que sí, y al final las tablas de unión.

    // 1. Users Table
    await queryInterface.createTable('users', { // tableName: 'users'
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // 2. Categories Table
    await queryInterface.createTable('Categories', { // tableName: 'Categories'
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      slug: {
        type: Sequelize.STRING(120),
        allowNull: true,
        unique: true,
      },
      iconUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      imageUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      color: {
        type: Sequelize.STRING(7),
        allowNull: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      metaTitle: {
        type: Sequelize.STRING(160),
        allowNull: true,
      },
      metaDescription: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // 3. Identity Table
    await queryInterface.createTable('Identities', { // tableName: 'Identities'
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      missionText: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      missionImageUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      visionText: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      visionImageUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      valuesText: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      valuesImageUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // 4. Players Table
    await queryInterface.createTable('Players', { // tableName: 'Players'
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      position: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      dateOfBirth: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      cityOfBirth: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      stateOfBirth: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      nationality: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      preferredFoot: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      photoUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      biography: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      instagramUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: 'Activo',
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      metaTitle: {
        type: Sequelize.STRING(160),
        allowNull: true,
      },
      metaDescription: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // 5. Teams Table
    await queryInterface.createTable('Teams', { // tableName: 'Teams'
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      shortName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      abbreviatedName: {
        type: Sequelize.STRING(3),
        allowNull: false,
        unique: true,
      },
      originalLogoUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      whiteLogoUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      blackLogoUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      primaryColor: {
        type: Sequelize.STRING(7),
        allowNull: true,
      },
      secondaryColor: {
        type: Sequelize.STRING(7),
        allowNull: true,
      },
      websiteUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      metaTitle: {
        type: Sequelize.STRING(160),
        allowNull: true,
      },
      metaDescription: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // 6. Sponsors Table
    await queryInterface.createTable('Sponsors', { // tableName: 'Sponsors'
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      logoUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      logoUrlBlack: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      logoUrlWhite: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      websiteUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      level: {
        type: Sequelize.ENUM('Main', 'Gold', 'Silver', 'Bronze', 'Partner'),
        allowNull: true,
        defaultValue: 'Partner',
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // 7. Testimonials Table
    await queryInterface.createTable('testimonials', { // tableName: 'testimonials'
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      authorName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      authorRole: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      photo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // 8. News Table
    await queryInterface.createTable('News', { // tableName: 'News'
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING(75),
        allowNull: false,
        unique: true,
      },
      subtitle: {
        type: Sequelize.STRING(125),
        allowNull: true,
      },
      summary: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      content: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      featuredImageUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      featuredImageAltText: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      videoUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      slug: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      publishedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      is_published: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      author: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      source: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      viewsCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      metaTitle: {
        type: Sequelize.STRING(160),
        allowNull: true,
      },
      metaDescription: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
      keywords: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // 9. HistoryEvents Table
    await queryInterface.createTable('HistoryEvents', { // tableName: 'HistoryEvents'
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      month: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      day: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      slug: {
        type: Sequelize.STRING(255),
        allowNull: true,
        unique: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      displayOrder: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      metaTitle: {
        type: Sequelize.STRING(160),
        allowNull: true,
      },
      metaDescription: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Tablas con claves foráneas (después de sus tablas padre)

    // 10. MonthlyPlayers Table (depends on Players)
    await queryInterface.createTable('MonthlyPlayers', { // tableName: 'MonthlyPlayers'
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      playerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Players', // Nombre de la tabla
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      month: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      reason: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      videoUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      metaTitle: {
        type: Sequelize.STRING(160),
        allowNull: true,
      },
      metaDescription: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // 11. HistorySubsections Table (depends on HistoryEvents)
    await queryInterface.createTable('HistorySubsections', { // tableName: 'HistorySubsections'
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      historyEventId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'HistoryEvents', // Nombre de la tabla
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      displayOrder: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      slug: {
        type: Sequelize.STRING(255),
        allowNull: true,
        unique: true,
      },
      metaTitle: {
        type: Sequelize.STRING(160),
        allowNull: true,
      },
      metaDescription: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // 12. Matches Table (depends on Teams)
    await queryInterface.createTable('Matches', { // tableName: 'Matches'
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      dateTime: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      category: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      homeTeamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Teams', // Nombre de la tabla
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      homeTeamScore: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      awayTeamId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Teams', // Nombre de la tabla
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      awayTeamScore: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      location: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      matchType: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'Programado',
      },
      round: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      highlightsUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      liveStreamUrl: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      metaTitle: {
        type: Sequelize.STRING(160),
        allowNull: true,
      },
      metaDescription: {
        type: Sequelize.STRING(300),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Tablas de unión (Many-to-Many)

    // 13. NewsCategories Table (join table for News and Categories)
    await queryInterface.createTable('NewsCategories', {
      newsId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'News', // Nombre de la tabla
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true, // Parte de la clave primaria compuesta
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Categories', // Nombre de la tabla
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true, // Parte de la clave primaria compuesta
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

  }, // Fin de la función up

  down: async (queryInterface, Sequelize) => {
    // Orden de eliminación de tablas: inverso al orden de creación.
    // Primero tablas de unión, luego tablas con FKs, y al final tablas principales.

    await queryInterface.dropTable('NewsCategories');
    await queryInterface.dropTable('Matches');
    await queryInterface.dropTable('HistorySubsections');
    await queryInterface.dropTable('MonthlyPlayers');
    await queryInterface.dropTable('News');
    await queryInterface.dropTable('HistoryEvents');
    await queryInterface.dropTable('testimonials');
    await queryInterface.dropTable('Sponsors');
    await queryInterface.dropTable('Teams');
    await queryInterface.dropTable('Players');
    await queryInterface.dropTable('Identities');
    await queryInterface.dropTable('Categories');
    await queryInterface.dropTable('users'); // users table
  }
};