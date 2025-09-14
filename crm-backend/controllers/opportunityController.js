const Opportunity = require('../models/Opportunity');

exports.createOpp = async (req, res) => {
  try {
    const { title, value, leadId } = req.body;
    const opp = new Opportunity({ title, value, ownerId: req.user.id, leadId });
    await opp.save();
    res.status(201).json(opp);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getOpps = async (req, res) => {
  try {
    const { role, id } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const query = role === 'manager' || role === 'admin' ? {} : { ownerId: id };

    const opps = await Opportunity.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(opps);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateOpp = async (req, res) => {
  try {
    const opp = await Opportunity.findById(req.params.id);
    if (!opp) return res.status(404).json({ msg: 'Opportunity not found' });

    const { role, id } = req.user;
    if (role === 'rep' && opp.ownerId.toString() !== id) {
      return res.status(403).json({ msg: 'Forbidden' });
    }

    const { title, value, stage } = req.body;
    if (title !== undefined) opp.title = title;
    if (value !== undefined) opp.value = value;
    if (stage !== undefined) opp.stage = stage;

    await opp.save();
    res.json(opp);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteOpp = async (req, res) => {
  try {
    const opp = await Opportunity.findById(req.params.id);
    if (!opp) return res.status(404).json({ msg: 'Opportunity not found' });

    const { role, id } = req.user;
    if (role === 'rep' && opp.ownerId.toString() !== id) {
      return res.status(403).json({ msg: 'Forbidden' });
    }

    await opp.remove();
    res.json({ msg: 'Opportunity removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
