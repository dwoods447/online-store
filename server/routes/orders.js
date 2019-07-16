const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/OrdersController');

router.post('/order', OrdersController.orderProducts);

module.exports = router;