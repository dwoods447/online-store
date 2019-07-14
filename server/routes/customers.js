const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/CustomerController');
// const csrfProtection = require('../middleware/csrf');

router.get('/index', CustomerController.index);
router.post('/register', CustomerController.register);
router.get('/customer/:customerId', CustomerController.show);

module.exports = router;