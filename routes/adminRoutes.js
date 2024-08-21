const express = require('express');
const { approveCampaign, getAllCampaignsToApprove } = require('../controllers/adminController');
const router = express.Router();


router.post('/approveCampaign/:id', approveCampaign);
router.get('/getAllCampaignsToApprove', getAllCampaignsToApprove)

module.exports = router;
