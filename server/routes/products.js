const express = require('express');
const router = express.Router();
const ProductsController  = require('../controllers/ProductsController.js');

router.get('/all', ProductsController.index);
router.get('/:productId', ProductsController.show);
router.get('/search/:search', ProductsController.searchProduct);
module.exports = router;