const jwt = require('jsonwebtoken');
const config = require('../config/config');
module.exports = (req, res, next) =>{
    const token = req.get('Authorization').split(' ')[1];
    console.log(`The token rec'vd ${token}`);
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, config.auth.jwtSecret);
        console.log(`Decoded Token : ${JSON.stringify(decodedToken)}`);
    } catch(error){
        res.status(500).send({
            error: `${error}`
        })
    }
    if(!decodedToken){
        res.status(401).send({
            error: `Not Authenticated`
        })
    }
    req.customerId = decodedToken.customerId;
    next();
}