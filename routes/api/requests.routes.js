const router = require('express').Router();

//include Controller 
const requestController = require('../../controller/requestController');

//get requests
router.get('/', requestController.getRequests);

//get request by id
router.get('/:id', requestController.getRequestById);

//add a request
router.post('/', requestController.addRequest);

//delete a request
router.delete("/:id", requestController.deleteRequest);

//confirm a request
router.post("/:id/status", requestController.statusRequest);

module.exports = router;