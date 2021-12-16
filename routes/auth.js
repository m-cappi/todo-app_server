const express = require('express');
const { Login, Register } = require('../controllers/AuthController');

const router = express.Router();

// @DESC login
// @ROUTE /auth/login
// TODO: express.validation
router.route('/login').post(Login);

// @DESC register
// @ROUTE /auth/register
// TODO: express.validation
router.route('/register').post(Register);

module.exports = router;
