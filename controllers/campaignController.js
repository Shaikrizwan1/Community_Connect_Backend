const Campaign = require('../models/campaign');

exports.getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find({});
        res.json(campaigns);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
