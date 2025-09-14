const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const auth = require('../middleware/auth');
const permit = require('../middleware/roles');
const leadController = require('../controllers/leadController');
// create lead
router.post(
  '/',
  auth,
  [ body('name').notEmpty().withMessage('Name required') ],
  leadController.createLead
);

// get all
router.get('/', auth, leadController.getLeads);

// get one
router.get('/:id', auth, leadController.getLead);

// update
router.put('/:id', auth, leadController.updateLead);

// delete
router.delete('/:id', auth, leadController.deleteLead);

// convert lead to customer
router.post('/:id/convert', auth, leadController.convertLead);

module.exports = router;
