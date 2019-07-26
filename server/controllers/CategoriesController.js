const { BookCategory } = require('../models');
const { Category } = require('../models');
const { Book } = require('../models');
const { Product } = require('../models');
const  { db } = require('../models')
module.exports = {
    // List all Categories
    async index(req, res){
        try {
            const categories = await Category.findAll({
                include:[{all: true}]
            });
             if(categories){
                res.send({
                    data: categories
                })
             }
        } catch(error){
            res.send({
                "error":error
            })
        }
    },
    // List all book in all categories
    async getAllBookCategories(req, res){
        try {
            const book_cats = await BookCategory.findAll(
                 {include:[{model: Book, attributes: ['id','title', 'isbn']}, {model: Category, attributes: ['id', 'name']}] },
                // {include:[{all: true}]}
            );
             if(book_cats){
                res.send({
                    data: book_cats
                })
             }
        } catch(error){
            res.send({
                "error":error
            })
        }
    },
    // List all books in specific category
    async getBookCategory(req, res){
        const catID = req.params.categoryId;
        try {
            const book_cat = await BookCategory.findAll({
                where: {CategoryId: catID}, include:[{model: Book, include:[{all: true}]}, {model: Category}]
            });
             if(book_cat){
                res.send({
                    data: book_cat
                })
             }
        } catch(error){
            res.send({
                "error":error
            })
        }
    },

    async getFeaturedCategories(req, res){
        try {
            const book_cats = await BookCategory.findAll(
               
                { include:[{model: Book}, {model: Category}] },
                // {include:[{all: true}]}
            );

             if(book_cats){
                res.send({
                    data: book_cats
                })
             }
        } catch(error){
            res.send({
                "error":error
            })
        }
    }


}