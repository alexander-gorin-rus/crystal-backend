const Order = require('../models/Order');
const Cart = require('../models/Cart');
const User = require('../models/User');

exports.createOrder = async (req, res) => {
    try {
        // const user = await User.findOne({ email: req.user.email }).exec();

        // let cart = await Cart.findOne({ orderedBy: user._id }).populate('products.product', '_id title price totalAfterDiscount').exec();

        // const { products, cartTotal, totalAfterDiscount } = cart;

        // res.json({ products, cartTotal, totalAfterDiscount });

    } catch (err) {
        console.log(err)
        res.status(400).json({
            err: err.message
        })
    }
}

exports.deleteOrder = async (req, res) => {
    try {
        let order = await Order.findByIdAndRemove(req.params.id);
        order.remove((err) => {
            if (err) {
                return res.status(400).json({
                    err: console.log(err)
                })
            }
            res.json({
                message: 'Заказ удален'
            })
        })
    } catch (err) {

    }
}

exports.readOrder = async (req, res) => {
    try {
        let order = await Order.findById(req.params.id)
        .sort('-createdAt')
        .populate("products.product")
        .populate('orderedBy')
        .exec()

        res.json(order)
    } catch (err) {
        return res.status(400).json({
            message: 'Не удалось найти такой заказ'
        })
    }
}