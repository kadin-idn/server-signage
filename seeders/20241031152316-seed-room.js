"use strict";

/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require("uuid");
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../dataSeed/room.json").map((el) => {
      el.id = uuidv4();
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Rooms", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Rooms", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
