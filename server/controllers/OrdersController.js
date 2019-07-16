const ProductsController = require('./ProductsController');
const { Order, OrderProduct, Product }  = require('../models');
module.exports = {
    async orderProducts(req, res){
        try {
            
            // Enter data in Orders table
            let todayDate = new Date().toISOString().slice(0,10);
            // console.log(`Today's Date ${todayDate}`);
            const order  = await Order.create({
                order_date: todayDate,
                shipping_address: req.body.shipping.address,
                shipping_city: req.body.shipping.city,
                shipping_country : req.body.shipping.country,
                CustomerId: req.body.customer.id 
            })
        //     console.log(`Order: ${JSON.stringify(order)}`);
        //     console.log(`Shipping Info: ${JSON.stringify(req.body.shipping, null, 2)}`);
        //    console.log('\r\n\r\n');
        //    console.log(`Customer Info: ${JSON.stringify(req.body.customer,null, 2)}`);
          if(order){
            for(let property in req.body){
                if(req.body.hasOwnProperty(property) && property === 'products'){
                    req.body.products.forEach((product)=> {
                         // Enter data in OrderProducts table 
                        let orderProduct = OrderProduct.create({
                            qty: product.quantity,
                            price: product.product.price,
                            OrderId: order.id,
                            ProductId: product.id
                        })
                        if(orderProduct){
                            // Decrease product qty's in Products table
                            Product.findOne({
                                attributes:['qty'], where: {id: product.id}
                            }).then(data => {
                                console.log(`Data: ${JSON.stringify(data)}`);
                                if(data){
                                    console.log(`Total Qty: ${data.qty}`);
                                    console.log(`Qty Bought: ${product.quantity}`);
                                    let newQty = parseInt(data.qty) - parseInt(product.quantity)
                                    console.log(`New Qty: ${newQty}}`);
                                    Product.update({qty: newQty} ,{where:{id: product.id}});
                                 }
                             });
                        }
                    })
                }
            }
          } 
           
            res.send({
                data: order
           })
        } catch(error){
            res.send({
               error: error
            })
        }
    }
}