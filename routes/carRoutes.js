const express = require('express')
const router = express.Router()
const { getCars, setCars, updateCars, deleteCars } = require('../controllers/carControllers')
const protect = require('../middleware/authMiddleware')


router.route('/').get(protect, getCars).post(protect, setCars)
router.route('/:id').put(protect, updateCars).delete(protect, deleteCars)

module.exports = router