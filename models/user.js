/* eslint-disable no-param-reassign */
const { Model } = require('sequelize');
const { HashSync } = require('../helpers/auth/hash');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await HashSync(user.password);
          }
        },
        beforeUpdate: async (user) => {
          if (user.password) {
            user.password = await HashSync(user.password);
          }
        }
      }
    }
  );
  return User;
};
