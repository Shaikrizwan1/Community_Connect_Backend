const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: String, required: true },
    img: { type: String, required: true },
    isActive: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const Campaign = mongoose.model('Campaign', campaignSchema);

module.exports = Campaign;
