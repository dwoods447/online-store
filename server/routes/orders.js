const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/OrdersController');

router.get('/order', OrdersController.orderProducts);

module.exports = router;