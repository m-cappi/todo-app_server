const { body } = require('express-validator');
const { validationChecker } = require('./validationChecker');

exports.validateTaskUpdate = [
  body('summary')
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage('Must be 3 to 50 chars long'),
  body('description')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Must be up to 50 chars long'),
  body('completed').optional().isBoolean(),
  body()
    .custom((value) => !!Object.keys(value).length)
    .withMessage('Please provide required field to update')
    .custom((value) => {
      const updates = Object.keys(value);
      const allowUpdates = ['summary', 'description', 'completed'];
      return updates.every((update) => allowUpdates.includes(update));
    })
    .withMessage('Invalid updates!'),
  validationChecker
];

exports.validateNewTask = [
  body('summary')
    .exists()
    .isLength({ min: 3, max: 50 })
    .withMessage('Must be 3 to 50 chars long'),
  body('description')
    .optional()
    .isLength({ max: 255 })
    .withMessage('Must be up to 50 chars long'),
  body('completed').optional().isBoolean(),
  body()
    .custom((value) => {
      const updates = Object.keys(value);
      const allowUpdates = ['summary', 'completed'];
      return updates.every((update) => allowUpdates.includes(update));
    })
    .withMessage('Invalid Task!'),
  validationChecker
];
