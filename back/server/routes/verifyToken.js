const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
    // const token = req.header('accsessToken')
    const token = req.header('auth-token')
    if (!token) return res.status(401).send('Access Denied')

        jwt.verify(token, ""+ process.env.ACCESS_TOKEN, (err,user)=>{
            req.user = user;
            next()
            if (err){
                res.status(400).send('Invalid Token')
            }
        })
}