/* eslint-disable implicit-arrow-linebreak */
const db = require('../models/index');

const { User } = db.sequelize.models;

const findUserByEmail = async (email) => User.findOne({ where: { email } });

const createUser = async ({ email, password }) =>
  User.create(
    {
      email,
      password
    },
    {
      validation: true,
      fields: ['email', 'password']
    }
  );

module.exports = {
  findUserByEmail,
  createUser
};
