const { Book } = require('../models');

// List all Books 
module.exports = {
    async index (req, res){
        try {
            const books = await Book.findAll({
                include:[{all: true}]
            });
            if(books){
                res.send({
                    data: books
                })
            }
        } catch (error){
            res.status(500).send({
                "error": error
            })
        }
    },
    create(req, res){
        res.send();
    },
    async store(req, res){
        res.send();
    },

    // List book 
    async show(req, res){
        try {
            const book = await Book.findOne({
                where: {id: req.params.bookId }, include: [{all: true}]
            })
            if (book){
                res.send({
                data: book
                });
            }
        } catch (error){
            res.send({
                "error": error
            });
        }
    },
    edit(req, res){
        res.send();
    },
    async patch(req, res){
        try {
            const bookObj = {};
            if(req.body.isbn) bookObj.isbn = req.body.isbn;
            if(req.body.title) bookObj.title = req.body.title;
            if(req.body.image)bookObj.image = req.body.image;
            if(req.body.copyright) bookObj.copyright = req.body.copyright;
            if(req.body.publisher) bookObj.publisher = req.body.publisher;
            const updatedBook = await Book.update(bookObj, {where:{id: req.body.bookId}});
            res.send({
                data: updatedBook
            });
        } catch (error){
            res.send({
                "error": error
            });
        }
     
    },
    delete(req, res){
        res.send();
    },
}

