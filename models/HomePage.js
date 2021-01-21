const mongoose = require('mongoose');

const homePageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    info: {
        type: String,
        required: true
    },
    fullInfo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    iin: {
        type: String
    },
    responsiblePerson: {
        type: String
    },
    appendix: {
        type: String
    },
    slug: {
        type: String,
        unique: true,
        text: true,
        lowercase: true,
        index: true
    }
})

module.exports = mongoose.model("HomePage", homePageSchema);