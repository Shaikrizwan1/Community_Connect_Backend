const express = require('express');
const router = express.Router();
const { getAllCampaigns } = require('../controllers/campaignController');
const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, getAllCampaigns);

module.exports = router;
