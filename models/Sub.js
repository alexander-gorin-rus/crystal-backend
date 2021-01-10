const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const SubCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },
    parent: {
        type: ObjectId,
        ref: "Category",
        required: true
    }
}, { timestamps: true }
);

module.exports = mongoose.model("Sub", SubCategorySchema);