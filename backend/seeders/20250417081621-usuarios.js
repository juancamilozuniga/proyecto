'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "usuarios",
      [
        {
          nombre: "Manuela Diaz",
          correo: "manu4@gmail.com",
          contrasena: "1234",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Jualiaa Arboleda",
          correo: "juliana@gmail.com",
          contrasena: "1234",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
