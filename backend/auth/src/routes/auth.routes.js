const express = require("express");
const router = express.Router();
const authControllers = require('../controllers/auth.controller')
const authValidations = require('../middlewares/validator.middleware');
const authMiddlware = require("../middlewares/auth.middleware");


router.post('/register', authValidations.registerUserValidations, authControllers.register)
router.post('/login', authValidations.loginUserValidations, authControllers.login)
router.get('/me', authMiddlware , authControllers.getCurrentUser)
router.get('/logout' , authControllers.logout)

module.exports = router;
