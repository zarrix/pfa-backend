const router = require('express').Router();
const multer = require("multer");
const upload = multer();

//include Controller 
const treeController = require('../../controller/treeController');

//get trees
router.get('/', treeController.getTrees);

//get tree by id
router.get('/:id', treeController.getTreeById);

//create a tree
router.post('/', upload.single("file"), treeController.addTree);

//edit a tree
router.put('/:id', treeController.updateTree)

//delete a tree
router.delete("/:id", treeController.deleteTree);


module.exports = router;