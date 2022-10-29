const mongoose = require('mongoose')

const carScheme = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Add Car Name']
    },
    make: {
        type: String,
        required: [true, 'Add Make Details']
    },
    color: {
        type: String,
        required: [true, 'Add Cars Color']
    },
    model: {
        type: String,
        required: [true, 'Add Cars Model']
    },
    registration_no: String,
    selectedFile: {
        type: String,
        required: [true, 'Add Car Image']
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Car', carScheme)