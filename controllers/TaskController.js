const { findUserTasks } = require('../services/TaskServices');

const tasksList = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const tasksArray = await findUserTasks(userId);

    if (!tasksArray) {
      throw new Error('Unexpected');
    } else if (tasksArray.length === 0) {
      res.sendStatus(204);
    } else {
      res.status(200).json(tasksArray);
    }
  } catch (err) {
    next(err);
  }
};

const newTask = (req, res, next) => {
  try {
    console.log('pending');
  } catch (err) {
    next(err);
  }
};

const updateTask = (req, res, next) => {
  try {
    console.log('pending');
  } catch (err) {
    next(err);
  }
};

const deleteTask = (req, res, next) => {
  try {
    console.log('pending');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  tasksList,
  newTask,
  updateTask,
  deleteTask
};
