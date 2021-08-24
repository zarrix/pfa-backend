const router = require('express').Router();

//include Controller 
const requestController = require('../../controller/requestController');

//get Requests
router.get('/', requestController.getRequests);

// get statistics based on type
router.get('/statistics', requestController.getStatistics)

// get statistics based on region
router.get('/statistics/graph', requestController.getStatisticsGraph)

//get request by id
router.get('/:id', requestController.getRequestById);

//add a Farmer
router.post('/', requestController.addRequest);

//edit a farmer request
router.put('/:id', requestController.updateRequest);

//delete a Farmer
router.delete("/:id", requestController.deleteRequest);

// get statistics based on status
router.get('/statistics/status', requestController.getStatisticsStatus)



module.exports = router;