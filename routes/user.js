const express = require('express');
const router = express.Router();
const { authCheck } = require('../middlewares/auth');
const {
    userCart,
    getUserCart,
    emptyCart,
    saveAddress,
    applyCouponToUserCart,
    createCashOrder,
    orders
} = require('../controllers/user');



router.post('/user/cart', authCheck, userCart);
router.get('/user/cart', authCheck, getUserCart);
router.delete('/user/cart', authCheck, emptyCart);
router.post('/user/address', authCheck, saveAddress);

//coupon
router.post('/user/cart/coupon', authCheck, applyCouponToUserCart)

//user orders
router.get('/user/orders', authCheck, orders);
router.post('/user/cash-order', authCheck, createCashOrder);

module.exports = router;