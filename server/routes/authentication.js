const express = require('express');
const router = express.Router();
const AuthenticationController = require('../controllers/AuthenticationController')


router.post('/login', AuthenticationController.login);
router.post('/logout', AuthenticationController.logout);


module.exports = router;