const { Product } = require('../models');
const {Book} = require('../models');
module.exports = {
    // List All Products
    async index (req, res){
        const products = await Product.findAll({
            include: [{model : Book, include:[{all: true}]}]
        });
        console.log(`Books: ${JSON.stringify(products)}`);
        try{
            if(products){
                res.send({
                   data: products
               });
            }
        } catch(error){
            res.status(500).send({
                "error": error
            });
        }   
    },
    create(req, res){
        res.send();
    },
    store(req, res){
        res.send();
    },
    show(req, res){
        res.send();
    },
    edit(req, res){
        res.send();
    },
    patch(req, res){
        res.send();
    },
    delete(req, res){
        res.send();
    }
}
