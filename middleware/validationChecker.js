const { validationResult } = require('express-validator');

const validationChecker = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(errors.errors[0].msg);
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = { validationChecker };
