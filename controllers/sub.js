const Sub = require('../models/Sub');
const Product = require('../models/Product');
const slugify = require('slugify');

exports.create = async (req, res) => {
    try {
        const { name, parent } = req.body;
        const sub = await Sub({ name, parent, slug: slugify(name) }).save();
        res.json(sub)
    } catch (err) {
        console.log(err)
        res.status(400).send('Create category error');
    }
}

exports.list = async (req, res) => {
    res.json(await Sub.find({}).populate('parent').sort({ createdAt: -1 }).exec());
}

exports.read = async (req, res) => {
    try {
        const sub = await Sub.findOne({ slug: req.params.slug }).exec();
        const products = await Product.find({ subs: sub })
            .populate('category')
            .exec()

        res.json({
            sub,
            products
        })

    } catch (err) {
        res.status(404).json({
            err: "Подкатегория не найдена"
        })
    }
}

exports.update = async (req, res) => {
    const { name, parent } = req.body;
    try {
        const updated = await Sub.findOneAndUpdate(
            { slug: req.params.slug },
            { name, parent, slug: slugify(name) },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        console.log(err)
        res.status(400).send('Не удалось обновить подкатегорию');
    }
}

exports.remove = async (req, res) => {
    try {
        const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
        res.json(deleted);
    } catch (err) {
        console.log(err)
        res.status(400).send('Не удалось удалить подкатегорию');
    }
}