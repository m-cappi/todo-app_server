/* eslint-disable implicit-arrow-linebreak */
const db = require('../models/index');

const { Task } = db.sequelize.models;

const findUserTasks = async (userId) =>
  Task.findAll({
    attributes: [
      'taskId',
      'summary',
      'description',
      'completed',
      'createdAt',
      'updatedAt'
    ],
    where: {
      userId
    },
    order: [
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

module.exports = { findUserTasks, createNewTask };
