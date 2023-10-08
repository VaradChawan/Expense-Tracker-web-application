const express = require('express');

const {loginController,registerController} = require('../controller/userController');

const router=express.Router();

//router creation
// post route - login

router.post('/login',loginController)

//post registration route
router.post('/register',registerController)

module.exports=router;