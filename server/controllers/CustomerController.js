const { Customer } = require('../models');

module.exports = {
    // List all customers
    async index (req, res){
        try { 
            const customers = await Customer.findAll({
                include:[{all:true}]
            });
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
    async register(req, res){      
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
    async show(req, res){
        try {
            const customer = await Customer.findOne({
                where:{id: req.params.customerId}, include:[{all:true}]
            })
            res.send({
                data : customer
            });
        } catch (error){
            res.status(500).send({
                "error": error
            })
        }
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