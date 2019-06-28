const express = require('express');
const router = express.Router();
const CategoriesController = require('../controllers/CategoriesController');

router.get('/all', CategoriesController.index);
router.get('/book/categories', CategoriesController.getAllBookCategories);
router.get('/book/category/:categoryId', CategoriesController.getBookCategory);


module.exports = router;