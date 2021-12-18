/* eslint-disable no-unused-vars */
const { Op } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Tasks needed for Unit testing
     */
    await queryInterface.bulkInsert('Tasks', [
      {
        summary: 'Demo Task 01',
        description: 'Demo Description 01',
        completed: 0,
        userId: 1
      },
      {
        summary: 'Demo Task 02',
        description: 'Demo Description 02',
        completed: 1,
        userId: 1
      },
      {
        summary: 'Demo Task 03',
        description: 'Demo Description 03',
        completed: 0,
        userId: 1
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     *
     */
    await queryInterface.bulkDelete('Tasks', {
      summary: {
        [Op.like]: 'Demo Task%'
      }
    });
  }
};
