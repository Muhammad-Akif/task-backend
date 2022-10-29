const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const generator = require('generate-password');
const sendEmail = require('../utils/email')
const emailValidator = require('deep-email-validator');

async function isEmailValid(email) {
    return emailValidator.validate(email)
}

// @desc Register a new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email } = req.body

    if (!name || !email ) {
        res.status(400)
        throw new Error("Please add all required fields")
    }    

    // Check if user exists

    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error("User already exists")
    }

    var password = generator.generate({
        length: 8,
        numbers: true
    });

    const {valid, reason, validators} = await isEmailValid(email);

    if (!valid){
        res.status(400).send({
          message: "Please provide a valid email address.",
          reason: validators[reason].reason
        })
    }
    else{
        await sendEmail(name, email, password)
    
        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
    
        //create user
        const newUser = await User.create({ name, email, password: hashedPassword })
    
        if (newUser) {
            res.status(201).json({
                _id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                token: generateToken(newUser._id)
            })
        } else {
            res.status(400)
            throw new Error("Invalid user data")
        }
    }
})

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error("Invalid credentials")
    }
})

// @get user data
// @route GET /api/users/me
// @access Privates
const getMe = asyncHandler(async (req, res) => {

    const user = req.user

    res.status(200).json({
        _id: user.id,
        name: user.name,
        email: user.email,
    })
})

// generate JWT token 

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn: '30d'})
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}