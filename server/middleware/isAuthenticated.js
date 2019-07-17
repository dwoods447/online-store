module.exports = (req, res, next) =>{
    if(!req.session.isLoggedIn){
        return res.status(403).send({
            error: 'You do not have permission to view this resource.'
        })
    }
    next();
}