const express = require('express');
const router = express.Router();
const AuthenticationController = require('../controllers/AuthenticationController')


router.get('/login', AuthenticationController.login);
router.get('/logout', AuthenticationController.logout);


module.exports = router;