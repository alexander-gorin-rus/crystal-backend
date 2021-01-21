const Cart = require('../models/Cart');
const User = require('../models/User');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');
const Order = require('../models/Order');
const { uuid } = require('uuidv4');


exports.userCart = async (req, res) => {
    const { cart } = req.body;

    let products = [];

    const user = await User.findOne({ email: req.user.email }).exec();

    //check if cart with logged in user already exists
    let cartExistsByThisUser = await Cart.findOne({ orderedBy: user._id }).exec();

    if (cartExistsByThisUser) {
        cartExistsByThisUser.remove();
    }

    for (i = 0; i < cart.length; i++) {
        let object = {};

        object.product = cart[i]._id;
        object.count = cart[i].count;

        //get price from DB in order to prevent modify price from frontend
        let productFromDb = await Product.findById(cart[i]._id).select('price').exec();

        object.price = productFromDb.price

        products.push(object)
    }

    //create total price for order
    let cartTotal = 0;
    for (i = 0; i < products.length; i++) {
        cartTotal = cartTotal + products[i].price * products[i].count;
    }

    let newCart = await new Cart({
        products,
        cartTotal,
        orderedBy: user._id
    }).save();

    console.log('save cart from user', newCart),
        res.json({
            ok: true
        });
}

exports.getUserCart = async (req, res) => {

    const user = await User.findOne({ email: req.user.email }).exec();

    let cart = await Cart.findOne({ orderedBy: user._id }).populate('products.product', '_id title price totalAfterDiscount').exec();

    const { products, cartTotal, totalAfterDiscount } = cart;

    res.json({ products, cartTotal, totalAfterDiscount });
}

exports.emptyCart = async (req, res) => {
    const user = await User.findOne({ email: req.user.email }).exec();

    const cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec();

    res.json(cart)
}

exports.saveAddress = async (req, res) => {
    const userAddress = await User.findOneAndUpdate(
        { email: req.user.email },
        { address: req.body.address })
        .exec();

    res.json({ ok: true })
}



exports.applyCouponToUserCart = async (req, res) => {
    const { coupon } = req.body;

    console.log('COUPON', coupon);

    const validCoupon = await Coupon.findOne({ name: coupon }).exec();

    if (validCoupon === null) {
        return res.json({
            err: 'Недействительный купон'
        });
    }
    console.log('VALID COUPON', validCoupon);

    const user = await User.findOne({ email: req.user.email }).exec();

    let { products, cartTotal } = await Cart.findOne({ orderedBy: user._id })
        .populate("products.product", "_id title price").exec();
    console.log('cartTotal', cartTotal, 'discount', validCoupon.discount)

    //calculate the total price after discount
    let totalAfterDiscount = (
        cartTotal - (cartTotal * validCoupon.discount) / 100
    ).toFixed(0);

    Cart.findOneAndUpdate(
        { orderedBy: user._id },
        { totalAfterDiscount },
        { new: true }
    );

    res.json(totalAfterDiscount)
};


exports.createCashOrder = async (req, res) => {

    const { COD, couponTrueOrFalse } = req.body;

    //if cod is true, create order with status of Cash on Delivery

    if (!COD) return res.status(400).send('Заказ с оплатой наличными не принят');

    const user = await User.findOne({ email: req.user.email }).exec();


    let userCart = await Cart.findOne({ orderedBy: user._id }).exec();

    let finalAmount = 0;

    if (couponTrueOrFalse && userCart.totalAfterDiscount) {
        finalAmount = userCart.totalAfterDiscount
    } else {
        finalAmount = userCart.cartTotal
    }

    let NDS = 0.12;

    let NDSAmmount = userCart.cartTotal * NDS;

    let amountWithNDS = userCart.cartTotal + NDSAmmount

    let newOrder = await new Order({
        products: userCart.products,
        paymentIntent: {
            id: uuid(),
            amount: finalAmount,
            nds: NDSAmmount,
            withNDS: amountWithNDS,
            currency: "тенге",
            status: "наличными по доставке",
            created: Date.now(),
            payment_method_types: ['наличными'],
            address: user.address
        },
        orderedBy: user._id,
        orderStatus: "Not processed"
    }).save();

    let bulkOption = userCart.products.map((item) => {
        return {
            updateOne: {
                filter: { _id: item.product._id }, //IMPORTANT item.product
                update: { $inc: { quantity: -item.count, sold: +item.count } }
            }
        }
    });

    let updated = await Product.bulkWrite(bulkOption, {});
    console.log("PRODUCT_QAUNTITY-- AND SOLD++", updated);

    console.log("NEW ORDER SAVED", newOrder);
    res.json({
        ok: true
    });
}


exports.orders = async (req, res) => {
    let user = await User.findOne({ email: req.user.email });

    let userOrder = await Order.find({ orderedBy: user._id })
        .sort("-createdAt")
        .populate("products.product")
        .exec();

    res.json(userOrder);
}