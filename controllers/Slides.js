const Slide = require('../models/Slides');
const slugify = require('slugify');

exports.createSlider = async (req, res) => {
    try {
        req.body.slug = slugify(req.body.title);
        const slider = await new Slide(req.body).save()
        res.json(slider);
    } catch (err) {
        console.log(err)
        res.status(400).json({
            err: err.message
        })
    }
}

exports.getSlides = async (req, res) => {
    try {
        const slides = await Slide.find({}).exec();
        res.json(slides)
    } catch (err) {
        res.status(400).json({
            err: err.message,
        })
    }
}


exports.readOneSlider = async (req, res) => {
    const slider = await Slide.findOne({ slug: req.params.slug })
        .exec();
    res.json(slider)
}

exports.updateSlider = async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const updated = await Slide.findOneAndUpdate({
            slug: req.params.slug
        },
            req.body,
            { new: true });
        res.json(updated)
    } catch (err) {
        console.log(err);
        res.status(400).json({
            err: err.message
        })
    }
}

exports.deleteSlider = async (req, res) => {
    try {
        const deleted = await Slide.findOneAndRemove({ slug: req.params.slug })
            .exec();
        res.json(deleted)
    } catch (err) {
        console.log(err);
        res.status(400).json({
            err: err.message
        })
    }
}