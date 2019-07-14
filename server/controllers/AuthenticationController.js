const { Customer } = require('../models');
const bcrypt = require('../app').bcrypt

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
            console.log(`Customer Password: ${customer.password}`)
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
                res.send({
                    data: customerJSON,
                })
              }   
            } catch(error){
                res.status(500).send({
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