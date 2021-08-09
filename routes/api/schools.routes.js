const router = require('express').Router();

//include Controller 
const schoolController = require('../../controller/schoolController');

//get School
router.get('/', schoolController.getSchools);

//get Farmer by id
router.get('/:id', schoolController.getSchoolById);

//add a Farmer
router.post('/', schoolController.addSchool);

//edit a farmer request
router.put('/:id', schoolController.updateSchool);

//delete a Farmer
router.delete("/:id", schoolController.deleteSchool);

module.exports = router;