const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, {
        foreignKey: 'fk_user'
      });
    }
  }
  Task.init(
    {
      summary: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        validate: { isInt: true }
      },
      fk_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { isInt: true },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    },
    {
      sequelize,
      modelName: 'Task'
    }
  );
  return Task;
};
