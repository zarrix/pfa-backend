const router = require('express').Router();
const multer = require("multer");
const upload = multer();

//include Controller 
const userController = require('../../controller/userController');

//Authentication
router.post("/login", userController.login);
router.get("/logout", userController.logout);

//get users
router.get('/', userController.getUsers);

//get user by id
router.get('/:id', userController.getUserById);

//create a user
router.post('/', upload.single("file"), userController.addUser);

//edit a user
router.put('/:id', userController.updateUser)

//delete a user
router.delete("/:id", userController.deleteUser);

//Authentication
router.post("/login", userController.login);
router.get("/logout", userController.logout);

module.exports = router;