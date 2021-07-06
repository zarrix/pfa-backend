const router = require('express').Router();

//include Controller 
const dashboardController = require('../../controller/dashboardController');

//get general informations: total trees, requests_number, donations_number, nurseries_number
router.get('/', dashboardController.getInfo);


module.exports = router;