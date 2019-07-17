const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/OrdersController');
const isAuthenticated  = require('../middleware/isAuthenticated')
router.post('/order', OrdersController.orderProducts);
router.get('/customer/:customerId', OrdersController.getCustomerOrders);
router.get('/order/:orderId', OrdersController.getProductsForOrder);
router.get('/order/ordernumber/:orderId', OrdersController.getOrder);
module.exports = router;