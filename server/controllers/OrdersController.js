const ProductsController = require('./ProductsController');
const { Order, OrderProduct, Product }  = require('../models');
module.exports = {
    async orderProducts(req, res){
        try {
            // Enter data in Orders table
            let todayDate = new Date().toISOString().slice(0,10);
            const order  = await Order.create({
                order_date: todayDate,
                shipping_address: req.body.shipping.address,
                shipping_city: req.body.shipping.city,
                shipping_country : req.body.shipping.country,
                CustomerId: req.body.customer.id 
            })
            // If the order was saved loop through req body and get products key
          if(order){
            for(let property in req.body){
                if(req.body.hasOwnProperty(property) && property === 'products'){
                    req.body.products.forEach((product)=> {
                        // Loop through each product in the array and
                         // Enter data in OrderProducts table 
                        let orderProduct = OrderProduct.create({
                            qty: product.quantity,
                            price: product.product.price,
                            OrderId: order.id,
                            ProductId: product.id
                        })
                        // If product saved in Order Product table
                        if(orderProduct){
                            // Decrease product's total qty in Products table
                            Product.findOne({
                                attributes:['qty'], where: {id: product.id}
                            }).then(data => {
                                if(data){
                                    // If product was found update its qty attribute
                                    let totalQty = parseInt(data.qty);
                                    let qtyOrdered = parseInt(product.quantity);
                                    let newQty = totalQty - qtyOrdered; 
                                    Product.update({qty: newQty} ,{where:{id: product.id}});
                                 }
                             });
                        }
                    })
                }
            }
            res.send({
                data: order
             })

          }  
        } catch(error){
            res.send({
               error: error
            })
        }
    },
    async getCustomerOrders(req, res){
        try{
            const customerOrders = await Order.findAll({
                where: {CustomerId: req.params.customerId}
            })
            if(customerOrders.length > 0){
                res.send({
                    data: customerOrders
                })
            }  else {
                res.send({
                    data: []
                })
            }
        } catch(error){
            res.send({
                error: error
            })
        }
    },

    async getProductsForOrder(req, res){
        try {
            const orderId = req.params.orderId;
            const orderProducts = await OrderProduct.findAll({
                where: {OrderId: orderId}
            })  
            console.log(`Order products found ${JSON.stringify(orderProducts)}`); 
            if(orderProducts.length > 0){
                res.send({
                    data: orderProducts
                })
            } else {
                res.send({
                    data: []
                })
            }   
        }catch(error){
            res.send({
                error: error
            })
        }
    },

    async getOrder(req, res){
        try { 
        const orderID = req.params.orderId;
        const order = await Order.findAll({
            where: {id: orderID}
        })
        if(order.length > 0){
            res.send({
                data: order  
            })
        } else {
            res.send({
                data: []
            })     
        }
    } catch(error){
            res.send({
                error: error
            })
      }
   },
}