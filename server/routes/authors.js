const express = require('express');
const router = express.Router();
const AuthorController = require('../controllers/AuthorController')

router.get('/all', AuthorController.index);
router.get('/:authorId', AuthorController.show)
router.get('/author/:authorId/books', AuthorController.findBooksByAuthor)
router.get('/book/:bookId/authors', AuthorController.findAuthorsByBook)
module.exports = router;