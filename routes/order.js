const express = require('express');
const router = express.Router();

const { createOrder, deleteOrder } = require('../controllers/order')


//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');


router.post('/order', createOrder, authCheck)
router.delete('/order/delete/:id', authCheck, adminCheck, deleteOrder);


module.exports = router;
