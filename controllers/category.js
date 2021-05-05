const Category = require('../models/Category');
const Sub = require('../models/Sub');
const slugify = require('slugify');
const Product = require('../models/Product');

exports.create = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await Category({ name, slug: slugify(name) }).save();
        res.json(category)
    } catch (err) {
        console.log(err);
    }
}

// exports.list = async (req, res) => {
//     res.json(await Category.find({}).populate('subs').sort({ createdAt: -1 }).exec());
// }

exports.list = async (req, res) => {
    let categories = await Category.find({})
        .exec();
    res.json(categories)
}

exports.read = async (req, res) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug }).exec();
        const products = await Product.find({ category })
            .populate('category')
            .sort([['volume', 'asc']])
            .exec();

        res.json({
            category,
            products
        })
    } catch (err) {
        console.log(err);
    }
}

exports.getSubs = async (req, res) => {
    Sub.find({ parent: req.params._id }).exec((err, subs) => {
        if (err)
            console.log(err);
        res.json(subs)
    })
}

exports.update = async (req, res) => {
    const { name } = req.body;
    try {
        const updated = await Category.findOneAndUpdate(
            { slug: req.params.slug },
            { name, slug: slugify(name) },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        console.log(err);
    }
}

exports.remove = async (req, res) => {
    try {
        const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
        res.json(deleted);
    } catch (err) {
        console.log(err);
    }
}