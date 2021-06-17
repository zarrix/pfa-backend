const router = require('express').Router();

//include Controller 
const donationController = require('../../controller/donationController');

//get donations
router.get('/', donationController.getDonations);

//get donation by id
router.get('/:id', donationController.getDonationById);

//add a donation
router.post('/', donationController.addDonation);

//delete a donation
router.delete("/:id", donationController.deleteDonation);

module.exports = router;