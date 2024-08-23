const express = require('express');
const router = express.Router();
const { getAllCampaigns, createCampaign, getMyCampaigns, deleteCampaign, getCampaign } = require('../controllers/campaignController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', getAllCampaigns);
router.get('/details/:id', getCampaign);
router.post('/createcampaign', protect, createCampaign);
router.get('/mycampaigns', protect, getMyCampaigns);
router.delete('/delete-campaign/:id', protect, deleteCampaign);

module.exports = router;
