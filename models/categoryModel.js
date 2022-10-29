const mongoose = require('mongoose')

const categoryScheme = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'please add a Category']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Category', categoryScheme)