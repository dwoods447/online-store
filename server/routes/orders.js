const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/OrdersController');

router.post('/order', OrdersController.orderProducts);
router.get('/customer/:customerId', OrdersController.getCustomerOrders)
module.exports = router;