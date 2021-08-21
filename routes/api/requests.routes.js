const router = require('express').Router();

// farmers requests

//include Controller 
const farmerController = require('../../controller/farmerController');

//get Farmers
router.get('/farmers/', farmerController.getFarmers);

//get Farmer by id
router.get('/farmers/:id', farmerController.getFarmerById);

//add a Farmer
router.post('/farmers/', farmerController.addFarmer);

//edit a farmer request
router.put('/farmers/:id', farmerController.updateFarmer);

//delete a Farmer
router.delete("/farmers/:id", farmerController.deleteFarmer);


// associations requests

//include Controller 
const associationController = require('../../controller/associationController');

//get associations
router.get('/associations/', associationController.getAssociations);

//get association by id
router.get('/associations/:id', associationController.getAssociationById);

//add a association
router.post('/associations/', associationController.addAssociation);

//edit a association request
router.put('/associations/:id', associationController.updateAssociation);

//delete a association
router.delete("/associations/:id", associationController.deleteAssociation);


// schools requests

//include Controller 
const schoolController = require('../../controller/schoolController');

//get School
router.get('/schools/', schoolController.getSchools);

//get Farmer by id
router.get('/schools/:id', schoolController.getSchoolById);

//add a Farmer
router.post('/schools/', schoolController.addSchool);

//edit a farmer request
router.put('/schools/:id', schoolController.updateSchool);

//delete a Farmer
router.delete("/schools/:id", schoolController.deleteSchool);


// requests statistics

//include Controller 
const requestController = require('../../controller/requestController');

//get Requests
router.get('/', requestController.getRequests);

//get request by id
router.get('/:id', requestController.getRequestById);

//add a Farmer
router.post('/', requestController.addRequest);

//edit a farmer request
router.put('/:id', requestController.updateRequest);

//delete a Farmer
router.delete("/:id", requestController.deleteRequest);

// get statistics based on type
router.get('/statistics', requestController.getStatistics)

// get statistics based on status
router.get('/statistics/status', requestController.getStatisticsStatus)



module.exports = router;