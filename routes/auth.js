const express = require('express');
const {
  Login,
  Register,
  Reauthenticate
} = require('../controllers/AuthController');
const { validateLogin } = require('../middleware/authValidator');
const { isAuthenticated } = require('../middleware/isAuthenticated');

const router = express.Router();

// @DESC login
// @ROUTE /auth/login
// TODO: express.validation
router.route('/login').post(validateLogin, Login);

// @DESC register
// @ROUTE /auth/register
// TODO: express.validation
router.route('/register').post(validateLogin, Register);

// @DESC register
// @ROUTE /auth/register
// TODO: express.validation
router.route('/me').get(isAuthenticated, Reauthenticate);

module.exports = router;
