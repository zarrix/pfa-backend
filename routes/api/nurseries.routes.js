const router = require('express').Router();

//include Controller 
const nurseryController = require('../../controller/nurseryController');

//get nurseries
router.get('/', nurseryController.getNurseries);

//get nursery by id
router.get('/:id', nurseryController.getNurseryById);

//create a nursery
router.post('/', nurseryController.addNursery);

//edit a nursery
router.put('/:id', nurseryController.updateNursery)

//delete a nursery
router.delete("/:id", nurseryController.deleteNursery);

//add trees to a nursery
router.post('/:id/addTree', nurseryController.addTree);


module.exports = router;