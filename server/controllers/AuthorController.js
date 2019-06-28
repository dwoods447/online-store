const { Author } = require('../models');
const { BookAuthor } = require('../models');
const { Book } = require('../models');
module.exports = {
    async index(req, res){
        const authors = await  Author.findAll();
        try {
            if(authors){
                res.send({
                    data: authors
                  })
            }
        } catch (error) {
            res.status(500).send({
              "error": error
            })
        }
    },
    async show(req, res){
        const authorId = req.params.authorId;
        try {
            const author = await findOne({
                where: {id: authorId}
            })
            if(author){
                res.send({
                    data: author
                })
            }
        } catch(error){
            res.status(500).send({
                "error": error
            })
        }
    },

    async findBooksByAuthor(req, res){
        const authorId = req.params.authorId;
          try { 
            const books = await BookAuthor.findAll({
                where: {AuthorId: authorId}, include:[{model: Book}, {model: Author}]
            })
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
    }
}