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
        foreignKey: 'userId'
      });
    }
  }
  Task.init(
    {
      taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: { isInt: true }
      },
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
      userId: {
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
