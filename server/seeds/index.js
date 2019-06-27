// Bring in sequleize
const { sequelize } = require('../models');
//Bring in BlueBird
const Promise = require('bluebird');


// Bring in models
const { Author } = require('../models');
const { Book } = require('../models');
const { BookAuthor } = require('../models');
const { BookCategory } = require('../models');
const { Category } = require('../models');
const { Customer } = require('../models');
const { Publisher } = require('../models');
const { Product } = require('../models')
// Bring in seed files
const authors = require('./authors.json');
const book_authors = require('./book_authors.json');
const books = require('./books.json');
const categories = require('./categories.json');
const customers = require('./customers.json');
const publishers = require('./publishers.json')
const products = require('./products.json')
const book_categories = require('./book_categories.json')


    sequelize.sync({force:true})
        .then(async function(){

            await Promise.all(
                authors.map(authors => {
                    Author.create(authors)
                })
            )
            
            await Promise.all(
                categories.map(categories => {
                    Category.create(categories)
                })
            )

            await Promise.all(
                customers.map(customers => {
                    Customer.create(customers)
                })
            )

            await Promise.all(
                publishers.map(publishers => {
                    Publisher.create(publishers)
                })
            )

            await Promise.all(
                books.map(books => {
                    Book.create(books)
                })
            )

            await Promise.all(
                books.map(books => {
                    Book.create(books)
                })
            )

            await Promise.all(
                products.map(products => {
                    Product.create(products)
                })
            )


            await Promise.all(
                book_authors.map(book_authors => {
                    BookAuthor.create(book_authors)
                })
            )

            await Promise.all(
                book_categories.map(book_categories => {
                    BookCategory.create(book_categories)
                })
            )

            
    

        })