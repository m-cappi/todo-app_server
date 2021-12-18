const {
  findUserTasks,
  createNewTask,
  updateTaskByPk,
  findTaskByPk,
  deleteTaskByPk
} = require('../services/TaskServices');

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

const updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { summary, description, completed } = req.body;
    const { userId } = req.user;

    if (!summary && !description && completed === undefined) {
      res.status(400);
      throw new Error('Nothing to update');
    }

    const payload = {};
    if (summary) payload.summary = summary;
    if (description) payload.description = description;
    if (completed !== undefined) payload.completed = completed;

    await updateTaskByPk({ taskId, userId, payload });

    const updatedTask = await findTaskByPk(taskId);

    res.status(200).json(updatedTask);
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { userId } = req.user;

    const isDeleted = await deleteTaskByPk(taskId, userId);

    if (!isDeleted) {
      res.status(403);
      throw new Error('taskId or userId do not match');
    }

    res.sendStatus(204);
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
