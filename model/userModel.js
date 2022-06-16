const mongoose = require('mongoose')
const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    joiningDate: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

module.exports = mongoose.model('Users', userModel)