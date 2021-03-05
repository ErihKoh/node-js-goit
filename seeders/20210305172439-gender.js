"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Genders",
      [
        {
          name: "m",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "f",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "none",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Genders", null, {});
  },
};
