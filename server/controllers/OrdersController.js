const ProductsController = require('./ProductsController');

module.exports = {
    async orderProducts(req, res){
        try {
            // Decrease products in Products table
            // Enter data in Orders table
            // Enter data in OrderProducts table 
            console.log(`Order Recieved: ${req.body}`);
        } catch(error){
            res.send({
               
            })
        }
    }
}