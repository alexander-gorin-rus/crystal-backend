const express = require('express');
const router = express.Router();

const {
    createSlider,
    getSlides,
    readOneSlider,
    updateSlider,
    deleteSlider
} = require('../controllers/Slides')


//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

router.post('/slide', authCheck, adminCheck, createSlider);//
router.get('/slides', getSlides);
router.get('/slide/:slug', readOneSlider);
router.put('/slide/:slug', authCheck, adminCheck, updateSlider);
router.delete('/slide/:slug', authCheck, adminCheck, deleteSlider);

module.exports = router;