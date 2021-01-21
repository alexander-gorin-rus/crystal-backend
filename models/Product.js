const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: 'Необходимо дать название продукту',
        text: true
    },
    slug: {
        type: String,
        unique: true,
        text: true,
        lowercase: true,
        index: true
    },
    description: {
        type: String,
        required: 'Необходимо описание продукта',
        text: true
    },
    fullDescription: {
        type: String,
        required: 'Необходимо полное описание продукта'
    },
    price: {
        type: Number,
        trim: true,
        required: 'Необходимо указать цену'
    },
    category: {
        type: ObjectId,
        ref: "Category"
    },
    nn: {
        type: String
    },
    subs: [
        {
            type: ObjectId,
            ref: "Sub",
        }
    ],
    quantity: Number,
    sold: {
        type: Number,
        default: 0
    },
    images: {
        type: Array
    },
    volume: {
        type: Number,
        required: 'Необходимо указать объём тары'
    },
    ratings: [
        {
            star: Number,
            postedBy: {
                type: ObjectId,
                ref: 'User'
            }
        }
    ],
    delivered: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);