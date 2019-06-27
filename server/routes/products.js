const express = require('express');
const router = express.Router();
const ProductsController  = require('../controllers/ProductsController.js');

router.get('/all', ProductsController.index);


module.exports = router;