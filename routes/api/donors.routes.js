const router = require('express').Router();
const multer = require("multer");
const upload = multer();

//include Controller 
const donorController = require('../../controller/donorController');

//Authentication
router.post("/login", donorController.login);
router.get("/logout", donorController.logout);

//get donors
router.get('/', donorController.getDonors);

//get donor by id
router.get('/:id', donorController.getDonorById);

//create a donor
router.post('/', upload.single("file"), donorController.addDonor);

//edit a donor
router.put('/:id', donorController.updateDonor)

//delete a donor
router.delete("/:id", donorController.deleteDonor);

//add to cart
router.put('/:id/cart/add', donorController.addToCart)

//remove from cart
router.put('/:id/cart/remove', donorController.removeFromCart)


module.exports = router;