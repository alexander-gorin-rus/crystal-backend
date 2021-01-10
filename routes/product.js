const express = require('express');
const router = express.Router();

//import controllers
const { create,
    listAll,
    update,
    remove,
    read,
    list,
    productsCount,
    productStar,
    listRelated,
    searchFilters,
} = require('../controllers/product');

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

//routes
router.post('/product', authCheck, adminCheck, create);
router.post('/products', list)
//search
router.post('/search/filters', searchFilters)

router.get('/products/total', productsCount);
router.get("/products/:count", listAll);
router.get('/product/:slug', read);
router.get('/product/related/:productId', listRelated)

router.put('/product/:slug', authCheck, adminCheck, update);
//star rating
router.put('/product/star/:productId', authCheck, productStar)

router.delete('/product/:slug', authCheck, adminCheck, remove);






module.exports = router;