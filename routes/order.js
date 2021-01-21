const express = require('express');
const router = express.Router();

const { createOrder, deleteOrder, readOrder } = require('../controllers/order')


//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');


router.post('/order', createOrder, authCheck)
router.delete('/order/delete/:id', authCheck, adminCheck, deleteOrder);
router.get('/order/:id', readOrder)


module.exports = router;
