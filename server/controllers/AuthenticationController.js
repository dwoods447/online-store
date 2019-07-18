const { Customer } = require('../models');
const bcrypt = require('../app').bcrypt
const jwt  = require('jsonwebtoken');
const config = require('../config/config');

function jwtSignCustomer(customer){
    const ONE_DAY = 60 * 60 * 24 * 1;
    return jwt.sign(customer, config.auth.jwtSecret, {expiresIn: ONE_DAY} )
}


module.exports = {
    async login(req, res){
        const {email , password} = req.body;
        // Find customer with email that matches
        const customer = await Customer.findOne({
            where:{email: email}
        })
        if(!customer){
            res.status(403).send({
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
                req.session.isLoggedIn = true;
                req.session.customer = customer;
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
        req.session.isLoggedIn = false;
        res.send();
    }
}