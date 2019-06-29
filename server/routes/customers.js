const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/CustomerController')

router.get('/index', CustomerController.index);
router.get('/register', CustomerController.register);
router.get('/customer/:customerId', CustomerController.show);

module.exports = router;