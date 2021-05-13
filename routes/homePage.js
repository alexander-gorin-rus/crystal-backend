const express = require('express');
const router = express.Router();

//import controllers
const {
    create,
    //createImage,
    read,
    readOne,
    update,
    remove,
    backgroundCreate,
    backgroundRead,
    backgroundReadOne,
    backgroundUpdate,
    backgroundDelete
} = require('../controllers/homePage');

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

//routes
router.post('/home-create', authCheck, adminCheck, create);
//router.post('/home-create-image', createImage);

router.post('/home-background', authCheck, adminCheck, backgroundCreate);
router.get('/home-background', backgroundRead);
router.get('/home-background/:slug', backgroundReadOne);
router.put('/home-background/:slug', authCheck, adminCheck, backgroundUpdate);
router.delete('/home-background/:slug', authCheck, adminCheck, backgroundDelete);


router.get('/home', read);
router.get('/home/:slug', readOne);
router.put('/home-update/:slug', authCheck, adminCheck, update);
router.delete('/home-delete/:slug', authCheck, adminCheck, remove);

router.get('/fake', (req, res) => {
    res.send('Hello Alexander Gorin Let us see if proxy works corrently')
})

module.exports = router;