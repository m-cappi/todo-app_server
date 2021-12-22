const express = require('express');
const {
  Login,
  Register,
  Reauthenticate
} = require('../controllers/AuthController');
const { isAuthenticated } = require('../middleware/isAuthenticated');

const router = express.Router();

// @DESC login
// @ROUTE /auth/login
// TODO: express.validation
router.route('/login').post(Login);

// @DESC register
// @ROUTE /auth/register
// TODO: express.validation
router.route('/register').post(Register);

// @DESC register
// @ROUTE /auth/register
// TODO: express.validation
router.route('/me').get(isAuthenticated, Reauthenticate);

module.exports = router;
