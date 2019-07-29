const { Customer } = require('../models');
const bcrypt = require('../src/app').bcrypt
const jwt  = require('jsonwebtoken');
const config = require('../config/config');

function jwtSignCustomer(customer){
    const ONE_HR = Math.floor(Date.now() / 1000) + (60 * 60);
    return jwt.sign({email: customer.email, customerId: customer.id}, config.auth.jwtSecret, {expiresIn: ONE_HR } )
}

module.exports = {
    async login(req, res){
        const {email , password} = req.body;
        // Find customer with email that matches
        const customer = await Customer.findOne({
            where:{email: email}
        })
        if(!customer){
            res.status(403).json({
                'error': 'Invalid email or password'
            });
        } else {
            try{
              const passwordMatch = await bcrypt.compare(password, customer.password);
              if(!passwordMatch){
                res.status(403).send({
                  'error': 'Invalid email and/or password'         
                })
              } else {
                const customerJSON = customer.toJSON();
                res.status(200).json({
                    data: customer,
                    token: jwtSignCustomer(customerJSON)
                })
              }   
            } catch(error){
                res.status(500).json({
                    error: error
                })
            }
        }
    },
    async logout(req, res){
        res.status(200).json({
            'success': 'logged out'
        });
    }
}