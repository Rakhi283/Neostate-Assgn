// routes/auth.js
const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const authController = require('../controllers/authController');

// signup
router.post(
  '/signup',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password min 6 chars')
  ],
  authController.signup
);

// login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').exists().withMessage('Password required')
  ],
  authController.login
);

module.exports = router;
