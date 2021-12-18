const express = require('express');
const {
  tasksList,
  addTask,
  updateTask,
  deleteTask
} = require('../controllers/TaskController');
const { isAuthenticated } = require('../middleware/isAuthenticated');

const router = express.Router();

// @DESC Get list of tasks
// @ROUTE /tasks
router.route('/').get(isAuthenticated, tasksList);

// @DESC Add a new task
// @ROUTE /tasks
router.route('/').post(isAuthenticated, addTask);

// @DESC Update a task
// @ROUTE /tasks/:taskId
router.route('/:taskId').put(isAuthenticated, updateTask);

// @DESC Delete a task
// @ROUTE /tasks/:taskId
router.route('/:taskId').delete(isAuthenticated, deleteTask);

module.exports = router;
