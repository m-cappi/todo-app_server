const { findUserTasks, createNewTask } = require('../services/TaskServices');

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

const addTask = async (req, res, next) => {
  try {
    const { summary, description } = req.body;
    const { userId } = req.user;

    if (!summary) {
      res.status(400);
      throw new Error('A new Task must have a summary');
    }

    const newTask = await createNewTask({ summary, description, userId });

    res.status(201).json(newTask);
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
  addTask,
  updateTask,
  deleteTask
};
