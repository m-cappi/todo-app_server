/* eslint-disable no-unused-vars */
const db = require('../models/index');

const { User } = db.sequelize.models;
const demoUser = { email: 'demo@mail.com', password: 'demo123' };

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Not using queryInterface due to password hashing being a model hook
     * Hooks don't work with queryIntergace.bulkInsert
     * User needed for Unit testing
     */
    await User.create({
      email: demoUser.email,
      password: demoUser.password
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     *
     */
    await queryInterface.bulkDelete('Users', {
      email: demoUser.email
    });
  }
};
