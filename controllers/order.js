const Order = require('../models/Order');

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