const router = require('express').Router();

//include Controller 
const farmerController = require('../../controller/farmerController');

//get Farmers
router.get('/', farmerController.getFarmers);

//get Farmer by id
router.get('/:id', farmerController.getFarmerById);

//add a Farmer
router.post('/', farmerController.addFarmer);

//edit a farmer request
router.put('/:id', farmerController.updateFarmer);

//delete a Farmer
router.delete("/:id", farmerController.deleteFarmer);

module.exports = router;