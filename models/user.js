const mongoose = require("mongoose")
const usersSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,

    },
    firstName: {
        type: String,
        required: true,
        min: [3, 'length must be more than three letters'],
        max: 12
    },
    userType: {
        type: String,
        // enum: ['user', 'admin'],
        default: 'user'
    }
})

module.exports = mongoose.model('users', usersSchema) 


//with validation
//   name: {
//         type: String,
//         required: true
//     },
//     price: {
//         type: Number,
//         min: 0,
//         max: 10
//     }
// min: [6, 'Too few eggs'],
//     max: 12

