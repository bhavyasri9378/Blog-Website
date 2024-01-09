const express = require('express');
const { getAllUsers, registerController, loginController } = require('../controllers/userController');

//router object
const router = express.Router();

//create user || post
router.post('/register', registerController);

//get all users || get
router.get('/all-users', getAllUsers);


//login || post
router.post('/login', loginController);

module.exports = router;