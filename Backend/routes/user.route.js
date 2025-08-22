const express = require("express");
const router = express.Router();
const {body} = require("express-validator")
const userController = require("../controller/user.controller")

// it will check if the comming data is correct or not 
router.post('/register',[
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname").isLength({min:3}).withMessage("First name should be atleast of 3 letters"),
    body('password').isLength({min:6}).withMessage("Password should be atleast of 6 characters")

],
// this controller will perform the action on incorrect data 
    userController.registerUser
)




module.exports = router;