const { validationResult } = require('express-validator');
const Lead = require('../models/Lead');
const Opportunity = require('../models/Opportunity');

exports.createLead = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { name, email, phone } = req.body;
    const lead = new Lead({ name, email, phone, ownerId: req.user.id });
    await lead.save();
    res.status(201).json(lead);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getLeads = async (req, res) => {
  try {
    const { role, id } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const query = role === 'manager' || role === 'admin' ? {} : { ownerId: id };

    const leads = await Lead.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(leads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ msg: 'Lead not found' });

    const { role, id } = req.user;
    if (role === 'rep' && lead.ownerId.toString() !== id) {
      return res.status(403).json({ msg: 'Forbidden' });
    }
    res.json(lead);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ msg: 'Lead not found' });

    const { role, id } = req.user;
    if (role === 'rep' && lead.ownerId.toString() !== id) {
      return res.status(403).json({ msg: 'Forbidden' });
    }

    const { name, email, phone, status } = req.body;
    if (name !== undefined) lead.name = name;
    if (email !== undefined) lead.email = email;
    if (phone !== undefined) lead.phone = phone;
    if (status !== undefined && (role === 'manager' || role === 'admin' || lead.ownerId.toString() === id)) {
      lead.status = status;
    }
    await lead.save();
    res.json(lead);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ msg: 'Lead not found' });

    const { role, id } = req.user;
    if (role === 'rep' && lead.ownerId.toString() !== id) {
      return res.status(403).json({ msg: 'Forbidden' });
    }

    await lead.remove();
    res.json({ msg: 'Lead removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Convert lead to opportunity
exports.convertLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ msg: 'Lead not found' });

    const { role, id } = req.user;
    if (role === 'rep' && lead.ownerId.toString() !== id) {
      return res.status(403).json({ msg: 'Forbidden' });
    }

    // create opportunity
    const { value = 0, title } = req.body;
    const oppTitle = title || `${lead.name} - Opportunity`;
    const opportunity = new Opportunity({
      title: oppTitle,
      value,
      ownerId: lead.ownerId,
      leadId: lead._id
    });
    await opportunity.save();

    // update lead status
    lead.status = 'Qualified';
    await lead.save();

    res.status(201).json({ opportunity, lead });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
