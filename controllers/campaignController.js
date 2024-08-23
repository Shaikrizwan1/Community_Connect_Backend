const Campaign = require('../models/campaign');

exports.getAllCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find({ isActive: 1 });
        res.json(campaigns);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getCampaign = async (req, res) => {
    try {
        console.log('getCampaign hit')
        const { id } = req.params;

        const campaigns = await Campaign.find({ _id: id });
        res.json(campaigns);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
};



exports.createCampaign = async (req, res) => {
    try {
        const { title, description, img } = req.body;
        const { id: userId } = req.user

        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

        const newCampaign = new Campaign({ title, description, userId, isActive: 0, img });
        await newCampaign.save();

        res.status(201).json(newCampaign);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getMyCampaigns = async (req, res) => {
    try {
        const { id: userId } = req.user;
        console.log(userId)

        if (!userId) {
            return res.status(400).json({ message: 'userId is required' });
        }

        const myCampaigns = await Campaign.find({ userId });

        if (myCampaigns.length === 0) {
            return res.status(404).json({ message: 'No campaigns found for this user' });
        }

        res.json(myCampaigns);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteCampaign = async (req, res) => {
    try {
        const { id } = req.params;
        const { id: userId } = req.user;

        const campaign = await Campaign.findOne({ _id: id, userId });

        if (!campaign) {
            return res.status(404).json({ message: 'Campaign not found or you do not have permission to delete it' });
        }

        await Campaign.deleteOne({ _id: id });

        res.json({ message: 'Campaign deleted successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
};
