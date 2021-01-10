const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema({

    products: [
        {
            product: {
                type: ObjectId,
                ref: 'Product'
            },
            count: Number
        }
    ],
    paymentIntent: {},
    orderStatus: {
        type: String,
        default: "Not processed",
        enum: [
            "Not processed",
            "Processing",
            "Delivered",
            "Canceled"
        ]
    },
    orderedBy: {
        type: ObjectId,
        ref: "User"
    },
    payed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
