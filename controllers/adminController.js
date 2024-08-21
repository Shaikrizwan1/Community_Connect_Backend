const User = require('../models/user');
const Campaign = require('../models/campaign');



exports.approveCampaign = async (req, res) => {
    const { id } = req.params;

    try {
        const campaign = await Campaign.findById(id);

        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found' });
        }

        campaign.isActive = 1;  // Deactivating the campaign
        await campaign.save();

        res.json({ message: 'Campaign Approved successfully', campaign });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllCampaignsToApprove = async (req, res) => {
    try {

        const campaigns = await Campaign.find({ isActive: 0 });

        if (campaigns.length === 0) {
            return res.status(404).json({ message: 'No campaigns to approve' });
        }

        res.json(campaigns);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};




