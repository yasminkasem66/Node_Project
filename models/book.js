const mongoose = require("mongoose")

const booksSchema = mongoose.Schema({
    bookName: {
        type: String,
        required: true,
        min: [5, 'length must be more than three letters'],
        max: 20
    },
    UserName: {
        type: String,
        required: true,
        min: [5, 'length must be more than three letters'],
        max: 20
    },
    auther: {
        type: String,
        required: true,
        min: [5, 'length must be more than three letters'],
        max: 20,
        default: 'admin'
    }
    , createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    description: {
        type: String
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usersSchema'
    }
}
)

module.exports = mongoose.model('books', booksSchema) // create collection fe db --> 2 params 1- name of collection



