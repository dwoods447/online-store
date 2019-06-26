const express = require('express');
const BooksController  = require('../controllers/BooksController.js');
const router = express.Router();

router.get('/index', BooksController.index);
router.get('/create', BooksController.create);
router.post('/store', BooksController.store);
router.get('/show/:id', BooksController.show);
router.get('/edit/:id', BooksController.edit);
router.patch('/upate/:id', BooksController.patch);
router.delete('/delete/:id', BooksController.delete);


module.exports  = router;