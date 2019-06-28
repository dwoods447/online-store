const { Customer } = require('../models');

module.exports = {
    // List all customers
    async index (req, res){
        try { 
            const customers = await Customer.findAll();
            if(customers){
                res.send({
                    data: customers
                });
            }
        } catch (error){
            res.send({
                "error": error
            });
        }
    },
    create(req, res){
        res.send();
    },
    store(req, res){      
        const customer = await Customer.create(req.body);
        try {
            if(customer){
                res.send({
                    data: customer
                });
            }
        } catch (error){
            res.status(500).send({
                "error": error
            })
        }
       
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