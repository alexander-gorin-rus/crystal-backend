const HomePage = require('../models/HomePage');
const slugify = require('slugify');
const Background = require('../models/Background');


exports.create = async (req, res) => {
    try {
        req.body.slug = slugify(req.body.title);
        const newHomePage = await new HomePage(req.body).save();
        res.json(newHomePage);
    } catch (err) {
        console.log(err);
    }
}

exports.read = async (req, res) => {
    let getHomePage = await HomePage.find({})
        .exec();

    res.json(getHomePage)
}

exports.update = async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const updated = await HomePage.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true })
        res.json(updated).exec()
    } catch (err) {
        console.log(err);
    }
}

exports.remove = async (req, res) => {
    try {
        const deleted = await HomePage.findOneAndRemove({ slug: req.params.slug })
            .exec();
        res.json(deleted);
    } catch (err) {
        console.log(err);
    }
}

exports.readOne = async (req, res) => {
    const home = await HomePage.findOne({ slug: req.params.slug })
        .exec();
    res.json(home);
};

exports.backgroundCreate = async (req, res) => {
    try {
        req.body.slug = slugify(req.body.title)
        const background = await new Background(req.body).save()
        res.json(background)
    } catch (err) {
        console.log(err);
    }
}

exports.backgroundRead = async (req, res) => {
    try {
        let background = await Background.find({})
            .exec();
        res.json(background)
    } catch (err) {
        console.log(err);
    }
}

exports.backgroundReadOne = async (req, res) => {
    const background = await Background.findOne({ slug: req.params.slug })
        .exec();
    res.json(background)
}

exports.backgroundUpdate = async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const updated = await Background.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true });
        res.json(updated).exec()
    } catch (err) {
        console.log(err);
    }
}

exports.backgroundDelete = async (req, res) => {
    try {
        const deleted = await Background.findOneAndRemove({ slug: req.params.slug })
            .exec();
        res.json(deleted);
    } catch (err) {
        console.log(err);
    }
}