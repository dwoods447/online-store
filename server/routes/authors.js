const express = require('express');
const router = express.Router();
const AuthorController = require('../controllers/AuthorController')

router.get('/all', AuthorController.index);
router.get('/book/:bookId/authors', AuthorController.findAuthorsByBook)
router.get('/author/:authorId/books', AuthorController.findBooksByAuthor)
router.get('/:authorId', AuthorController.show)


module.exports = router;