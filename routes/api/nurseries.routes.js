const router = require('express').Router();

//include Controller 
const nurseryController = require('../../controller/nurseryController');

//get nurseries
router.get('/', nurseryController.getNurseries);

//get trees in every nursery
router.get('/trees', nurseryController.getTrees);

//get materials in every nursery
router.get('/materials', nurseryController.getMaterials);

//get nurseries statictics
router.get('/statistics', nurseryController.getStatistics);

//get nursery by id
router.get('/:id', nurseryController.getNurseryById);

//create a nursery
router.post('/', nurseryController.addNursery);

//edit a nursery
router.put('/:id', nurseryController.updateNursery)

//delete a nursery
router.delete("/:id", nurseryController.deleteNursery);

// //add or remove trees/materials to a nursery
router.put('/:id/edit', nurseryController.editNursery);


module.exports = router;