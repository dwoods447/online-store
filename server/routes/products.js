const express = require('express');
const router = express.Router();
const ProductsController  = require('../controllers/ProductsController.js');

router.get('/all', ProductsController.index);
router.get('/product/:productId', ProductsController.show);
router.get('/product/book/:bookId/bookInfo', ProductsController.getProductByBookId)
router.get('/search/:search', ProductsController.searchProduct);
router.post('/decrease/product/:productId/quantity', ProductsController.decreaseProductQty);
router.post('/increase/product/:productId/quantity', ProductsController.increaseProductQty);
module.exports = router;