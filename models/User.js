const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        index: true
    },
    role: {
        type: String,
        default: "subscriber"
    },
    cart: {
        type: Array,
        default: []
    },
    address: {
        type: String
    },
    //wishList: [{ type: ObjectId, ref: "Product" }],
    userRating: {
        type: String,
        default: "Надёжный",
        enum: [
            "Надёжный",
            "Ненадёжный"
        ]
    }
}, { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);