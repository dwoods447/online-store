const express = require('express');
const BooksController  = require('../controllers/BooksController.js');
const router = express.Router();

router.get('/index', BooksController.index);
router.get('/create', BooksController.create);
router.post('/store', BooksController.store);
router.get('/show/:bookId', BooksController.show);
router.get('/edit/:bookId', BooksController.edit);
router.patch('/update/:bookId', BooksController.patch);
router.delete('/delete/:bookId', BooksController.delete);


module.exports  = router;