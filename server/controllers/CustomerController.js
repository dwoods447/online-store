const { Customer } = require('../models');

const  bcrypt = require('bcryptjs');
module.exports.bcrypt = bcrypt;
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
        const newCustomerEmail = req.body.email;
        const emailExist = await Customer.findOne({
            where: {email: newCustomerEmail}
        })
        if(emailExist){
            res.send({
                'error': 'This account already exists. Please Login in.'
            });
        } else {
            try {
                const salt  = bcrypt.genSaltSync(8);
                const hashedPassword = bcrypt.hashSync(req.body.password, salt);
                        customer = await Customer.create({
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        phone: req.body.phone,
                        address: req.body.address,
                        city: req.body.city,
                        country: req.body.country,
                        email: req.body.email,
                        password: hashedPassword,
                 });
                if(customer){
                    res.send({
                        data: customer
                    });
                }
            } catch (error){
                res.send({
                    "error": error
                })
            }
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