const { Product } = require('../models');
const { Book } = require('../models');
const { Op } = require('sequelize');
// const  { BookAuthor } = require('../models');
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

    //Find product by id
    async show(req, res){
        try {
            const product  = await Product.findAll({ 
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
    async decreaseProductQty(req, res){
        const productID = req.params.productId;
        try {
            if(req.body.qty){
              const productQty = await Product.findOne({
                      attributes:['qty'], where: {id: productID}
               });
             if(productQty){
                 const newQty =  productQty.qty - req.body.qty;
                    const updatedProduct = await Product.update({qty: newQty} ,{where:{id: productID}});
                    if(updatedProduct){
                        res.send({
                            data: updatedProduct
                        });
                    }
             }
          }
        } catch(error){
            res.send({
                "error": error
            })
        }   
    },


    async increaseProductQty(req, res){
        const productID = req.params.productId;
        try {
            if(req.body.qty){
              const productQty = await Product.findOne({
                      attributes:['qty'], where: {id: productID}
               });
             if(productQty){
                 const newQty =  productQty.qty + req.body.qty;
                    const updatedProduct = await Product.update({qty: newQty} ,{where:{id: productID}});
                    if(updatedProduct){
                        res.send({
                            data: updatedProduct
                        });
                    }
             }
          }
        } catch(error){
            res.send({
                "error": error
            })
        }   
    },
    // Find Product by book Id
    async getProductByBookId(req, res){
        try {
            const product =  await Product.findAll({
                where:{BookId: req.params.bookId}, include:[{model: Book}]
            })
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

    async searchProduct(req, res){
        try {
            const product  = await Product.findAll({ 
                    include: [{model : Book, include:[{all:true}], where: {
                        [Op.or]: ['title','isbn', 'synopsis' ].map(key => ({
                            [key]: {
                              [Op.like]: `%${req.params.search}%`
                            }
                          }))
                    }}]
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
    }
}
