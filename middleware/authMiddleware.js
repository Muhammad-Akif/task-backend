const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // get token
            token = req.headers.authorization.split(' ')[1];

            // verify token
            const decode = jwt.verify(token, process.env.JWT_SECRET)

            //get user from token
            req.user = await User.findById(decode.id).select('-password');

            console.log("req --> ", req.user)

            next();
        } catch (error){
            res.status(401)
            throw new Error('Not authorized')
        } 
    }

    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token provided');
    }
})

module.exports = protect;