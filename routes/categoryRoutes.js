const express = require('express')
const router = express.Router()
const { getCategory, setCategory, updateCategory, deleteCategory } = require('../controllers/categoryControllers')
const protect = require('../middleware/authMiddleware')


router.route('/').get(protect, getCategory).post(protect, setCategory)
router.route('/:id').put(protect, updateCategory).delete(protect, deleteCategory)

module.exports = router