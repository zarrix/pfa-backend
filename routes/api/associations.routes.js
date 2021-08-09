const router = require('express').Router();

//include Controller 
const associationController = require('../../controller/associationController');

//get associations
router.get('/', associationController.getAssociations);

//get association by id
router.get('/:id', associationController.getAssociationById);

//add a association
router.post('/', associationController.addAssociation);

//edit a association request
router.put('/:id', associationController.updateAssociation);

//delete a association
router.delete("/:id", associationController.deleteAssociation);

module.exports = router;