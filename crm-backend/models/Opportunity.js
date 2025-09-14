const mongoose = require('mongoose');

const oppSchema = new mongoose.Schema({
  title: { type: String, required: true },
  value: { type: Number, default: 0 },
  stage: { type: String, enum: ['Discovery', 'Proposal', 'Won', 'Lost'], default: 'Discovery' },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Opportunity', oppSchema);
