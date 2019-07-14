const express = require('express');
const router = express.Router();
const csrfProtection = require('../middleware/csrf');


// Send CSRF token for session
router.get('/api/getcsrftoken', csrfProtection, function (req, res) {
    let token  = { csrfToken: req.csrfToken()}
    console.log('\r\n\r\n');
    console.log(JSON.stringify(req.cookies));
    console.log('\r\n\r\n')
    console.log(JSON.stringify(`Returning this Token from Server: ${ JSON.stringify(token) }`))
    console.log('\r\n\r\n')
    return res.json(token);
});



module.exports = router;
