const Car = require('../models/carModel')
const asyncHandler = require('express-async-handler')

// @desc Get Cars
// @route GET /api/Cars
// @access Public
const getCars = asyncHandler(async (req, res) => {
    const cars = await Car.find({ registration_no: { $ne: null } })
    res.status(200).json(cars)
})

// @desc post Cars
// @route POST /api/Cars
// @access Private
const setCars = asyncHandler(async (req, res) => {
    try {
        const cars = await Car.create({ ...req.body, user: req.user.id })
        res.status(201).json(cars);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
})

// @desc Update Cars
// @route PUT /api/Cars/id
// @access Private
const updateCars = asyncHandler(async (req, res) => {
    const car = await Car.findById(req.params.id)
    if (!car) {
        res.status(401)
        throw new Error('Car not found')
    }

    // Make sure the logged in user matches the goal user
    if (car.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedcar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedcar)
})

// @desc Delete Cars
// @route DELETE /api/Cars/id
// @access Private
const deleteCars = asyncHandler(async (req, res) => {
    const car = await Car.findById(req.params.id)
    if (!car) {
        res.status(400)
        throw new Error('car not found')
    }

    // Make sure the logged in user matches the goal user
    if (car.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await car.remove()
    res.status(200).json({ id: req.params.id })
})

module.exports = {
    getCars,
    setCars,
    updateCars,
    deleteCars
}