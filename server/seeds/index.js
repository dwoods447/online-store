// Bring in sequleize
const { sequelize } = require('../models');
//Bring in BlueBird
const Promise = require('bluebird');
//Bring in Bcrypt to hash passwords
const  bcrypt = require('bcryptjs');
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
                authors.map(author => {
                    Author.create(author)
                })
            )
            
            await Promise.all(
                categories.map(category => {
                    Category.create(category)
                })
            )

            await Promise.all(
                customers.map(customer => {
                    const salt  = bcrypt.genSaltSync(8);
                    const hashedPassword = bcrypt.hashSync(customer.password, salt);
                    Customer.create({
                        first_name: customer.first_name,
                        last_name: customer.last_name,
                        phone: customer.phone,
                        address: customer.address,
                        city: customer.city,
                        country: customer.country,
                        email: customer.email,
                        password: hashedPassword
                    })
                })
            )

            await Promise.all(
                publishers.map(publisher => {
                    Publisher.create(publisher)
                })
            )

            await Promise.all(
                books.map(book => {
                    Book.create(book)
                })
            )

            // await Promise.all(
            //     books.map(book => {
            //         Book.create(book)
            //     })
            // )

            await Promise.all(
                products.map(product => {
                    Product.create(product)
                })
            )


            await Promise.all(
                book_authors.map(book_author => {
                    BookAuthor.create(book_author)
                })
            )

            await Promise.all(
                book_categories.map(book_category => {
                    BookCategory.create(book_category)
                })
            )

            
    

        })