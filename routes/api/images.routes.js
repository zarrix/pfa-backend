const router = require('express').Router();
const multer = require("multer");
const upload = multer();

//include Controller 
const imageController = require('../../controller/imageController');


// Get image
router.get('/:id', imageController.getImage);

// Update image
router.put('/:id', upload.single("file"), imageController.updateImage);

module.exports = router