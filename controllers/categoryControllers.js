const Category = require('../models/categoryModel')
const asyncHandler = require('express-async-handler')

// @desc Get Category
// @route GET /api/Category
// @access Private
const getCategory = asyncHandler(async(req, res)=>{
        const categories = await Category.find({user: req.user.id})
        res.status(200).json(categories)
})

// @desc post Category
// @route POST /api/Category
// @access Private
const setCategory = asyncHandler(async (req, res)=>{
        if(!req.body.name){
            res.status(400)
            throw new Error('Please add a Category Name')
        } 
        const categories = await Category.create({
            name: req.body.name,
            user: req.user.id
        })

        res.status(200).json(categories)
})

// @desc Update Category
// @route PUT /api/Category/id
// @access Private
const updateCategory = asyncHandler(async (req, res)=>{
    const category = await Category.findById(req.params.id)
    if(!category){
        res.status(401)
        throw new Error('category not found')
    }

    // Make sure the logged in user matches the goal user
    if(category.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedCategory)
})

// @desc Delete Category
// @route DELETE /api/Category/id
// @access Private
const deleteCategory = asyncHandler(async (req, res)=>{
    const category = await Category.findById(req.params.id)
    if(!category){
        res.status(400)
        throw new Error('category not found')
    }

    // Make sure the logged in user matches the goal user
    if(category.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await category.remove()
    res.status(200).json({ id: req.params.id})
})

module.exports= {
    getCategory,
    setCategory,
    updateCategory,
    deleteCategory
}