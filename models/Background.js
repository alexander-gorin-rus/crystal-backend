const mongoose = require('mongoose');

const backgroundSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
    },
    text: {
        type: String
    },
    slug: {
        type: String,
        unique: true,
        text: true,
        lowercase: true,
        index: true
    },
}
);

module.exports = mongoose.model("Background", backgroundSchema);