'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Customers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(60),
        allowNull:false,
      },
      lastname: {
        type: Sequelize.STRING(60),
        allowNull:false,
      },
      rfc: {
        type: Sequelize.STRING(15),
        allowNull:false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull:false,
      },
      phone: {
        type: Sequelize.STRING(15),
        allowNull:false,
      },
      status: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Customers');
  }
};