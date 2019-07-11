const { Customer } = require('../models');


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
              const isValidPassword = password === customer.password;
              if(!isValidPassword){
                res.status(403).send({
                  'error': 'Invalid email and/or password'         
                })
              } else {
                  const customerJSON = customer.toJSON();
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
        
        res.send();
    }
}