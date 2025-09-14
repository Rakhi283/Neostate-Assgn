const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const auth = require('../middleware/auth');
const opportunityController = require('../controllers/opportunityController');

// create
router.post(
  '/',
  auth,
  [ body('title').notEmpty().withMessage('Title required') ],
  opportunityController.createOpp
);

// get all
router.get('/', auth, opportunityController.getOpps);

// update
router.put('/:id', auth, opportunityController.updateOpp);

// delete
router.delete('/:id', auth, opportunityController.deleteOpp);

module.exports = router;
