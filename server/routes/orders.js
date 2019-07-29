const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/OrdersController');
const isAuthenticated = require('../middleware/is-auth')
router.post('/order', isAuthenticated, OrdersController.orderProducts);
router.get('/customer/:customerId', isAuthenticated, OrdersController.getCustomerOrders);
router.get('/order/:orderId', isAuthenticated, OrdersController.getProductsForOrder);
router.get('/order/ordernumber/:orderId', isAuthenticated, OrdersController.getOrder);
module.exports = router;