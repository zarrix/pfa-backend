const router = require('express').Router();
const multer = require("multer");
const upload = multer();

//include Controller 
const projectController = require('../../controller/projectController');

//get projects
router.get('/', projectController.getProjects);

//get project by id
router.get('/:id', projectController.getProjectById);

//create a project
router.post('/', upload.single("file"), projectController.addProject);

//edit a project
router.put('/:id', projectController.updateProject)

//delete a project
router.delete("/:id", projectController.deleteProject);

//add an update
router.post('/:id/addUpdate', projectController.addUpdate);


module.exports = router;