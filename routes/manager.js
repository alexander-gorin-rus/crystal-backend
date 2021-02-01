const express = require('express');
const router = express.Router();
const { authCheck, managerCheck } = require('../middlewares/auth');
const {
    orders, orderStatus
} = require('../controllers/admin');

router.get('/manager/orders', authCheck, managerCheck, orders);
router.put('/manager/order-status', authCheck, managerCheck, orderStatus)


module.exports = router;