const { Product } = require('../models');
const {Book} = require('../models');
module.exports = {
    // List All Products
    async index (req, res){
        const products = await Product.findAll({
            include: [{model : Book, include:[{all: true}]}]
        });
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
    async show(req, res){
        try {
            const product  = await Product.findOne({ 
                    where: {id: req.params.productId}, include: [{model : Book, include:[{all: true}]}]
            });
        if(product){
            res.send({
               data:  product
            });
         }     
        } catch(error){
            res.send({
                "error": error
            })
        }
    },
    async edit(req, res){
        try {
            const product  = await Product.findOne({ 
                    where: {id: req.params.productId}, include: [{model : Book, include:[{all: true}]}]
            });
        if(product){
            res.send({
               data:  product
            });
         }     
        } catch(error){
            res.send({
                "error": error
            })
        }
    },
    async patch(req, res){
        const productID = req.params.productId;
        try {

            if(req.body.price){
                const updatedProduct = await Product.update({price: req.body.price}, {where:{id: productID}});
            }
            if(req.body.qty){
                const updatedProduct = await Product.update({qty: req.params.qty} ,{where:{id: productID}});
            }
        } catch(error){
            res.send({
                "error": error
            })
        }   
    },
    delete(req, res){
        res.send();
    }
}
