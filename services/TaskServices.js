/* eslint-disable implicit-arrow-linebreak */
const db = require('../models/index');

const { Task } = db.sequelize.models;

const findUserTasks = async (userId) =>
  Task.findAll({
    attributes: { exclude: ['userId'] },
    where: {
      userId
    },
    order: [
      ['completed', 'ASC'],
      ['updatedAt', 'DESC'],
      ['createdAt', 'DESC']
    ]
  });

const createNewTask = async ({ summary, description, userId }) =>
  Task.create(
    {
      summary,
      description,
      userId,
      completed: 0
    },
    {
      validation: true,
      fields: ['summary', 'description', 'userId', 'completed']
    }
  );

const updateTaskByPk = async ({ taskId, userId, payload }) =>
  Task.update(payload, { where: { taskId, userId }, validation: true });

const findTaskByPk = async (taskId) =>
  Task.findByPk(taskId, { attributes: { exclude: ['userId'] } });

const deleteTaskByPk = async (taskId, userId) =>
  Task.destroy({ where: { taskId, userId } });

module.exports = {
  findUserTasks,
  createNewTask,
  updateTaskByPk,
  findTaskByPk,
  deleteTaskByPk
};
