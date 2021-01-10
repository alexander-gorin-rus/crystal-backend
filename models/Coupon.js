const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const couponSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        uppercase: true,
        required: "Необходимо дать название скидочному купону",
        minlength: [2, 'Слишком короткое название'],
        maxlength: [40, 'Слишком длинное название']
    },
    expiry: {
        type: Date,
        required: true
    },
    discount: {
        type: Number,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);