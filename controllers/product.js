const Product = require('../models/Product');
const slugify = require('slugify');
const User = require('../models/User');

exports.create = async (req, res) => {
    try {
        console.log(req.body);
        req.body.slug = slugify(req.body.title);
        const newProduct = await new Product(req.body).save();
        res.json(newProduct);
    } catch (err) {
        console.log(err)
        res.status(400).json({
            err: err.message
        })
    }
}

//              WITHOUT PAGINATION
// exports.list = async (req, res) => {
//     try {
//         // createdAt/updatedAt, desc/asc, 3
//         const { sort, order, limit } = req.body;
//         const products = await Product.find({})
//             .populate("category")
//             .populate("subs")
//             .sort([[sort, order]])
//             .limit(limit)
//             .exec();

//         res.json(products);
//     } catch (err) {
//         console.log(err);
//     }
// };

//              WITH PAGINATION
exports.list = async (req, res) => {
    try {
        const { sort, order, page } = req.body;
        const currentPage = page || 1
        const perPage = 3

        const products = await Product.find({})
            .skip([currentPage - 1] * perPage)
            .populate("category")
            .populate("subs")
            .sort([[sort, order]])
            .limit(perPage)
            .exec();

        res.json(products);
    } catch (err) {
        console.log(err);
    }
};

exports.listAll = async (req, res) => {
    let products = await Product.find({})
        .limit(parseInt(req.params.count))
        .populate('category')
        .populate('subs')
        .sort([["price", "asc"]])
        .exec();
    res.json(products)
}

exports.update = async (req, res) => {
    try {
        if (req.body.title) {
            req.body.slug = slugify(req.body.title)
        }
        const updated = await Product.findOneAndUpdate(
            { slug: req.params.slug },
            req.body,
            { new: true });
        res.json(updated).exec()
    } catch (err) {
        console.log(err)
        res.status(400).json({
            err: err.message
        })
    }
}

exports.remove = async (req, res) => {
    try {
        const deleted = await Product.findOneAndRemove({ slug: req.params.slug })
            .exec();
        res.json(deleted);
    } catch (err) {
        console.log(err)
        return res.status(400).send('Не удалось удалить продукт');
    }
}

exports.read = async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug })
        .populate('category')
        .populate('subs')
        .exec();
    res.json(product);
};

exports.productsCount = async (req, res) => {
    let total = await Product.find({}).estimatedDocumentCount().exec();
    res.json(total);
}

exports.productStar = async (req, res) => {
    const product = await Product.findById(req.params.productId).exec();
    const user = await User.findOne({ email: req.user.email }).exec();
    const { star } = req.body

    //check if currently lodded in user have already added rating to this product
    let existingRatingObject = product.ratings.find(
        (elem) => elem.postedBy.toString() === user._id.toString()
    );

    if (existingRatingObject === undefined) {
        let ratingAdded = await Product.findByIdAndUpdate(
            product._id,
            {
                $push: { ratings: { star, postedBy: user._id } },
            },
            { new: true }
        ).exec();
        console.log("rating added", ratingAdded);
        res.json(ratingAdded)
    } else {
        //if a user has already set rating, update it
        const ratingUpdated = await Product.updateOne(
            {
                ratings: { $elemMatch: existingRatingObject }
            },
            { $set: { "ratings.$.star": star } },
            { new: true }
        ).exec();
        console.log("ratingUpdated", ratingUpdated);
        res.json(ratingUpdated)
    }
}

exports.listRelated = async (req, res) => {
    const product = await Product.findById(req.params.productId).exec();

    const related = await Product.find({
        _id: { $ne: product._id },
        category: product.category
    })
        .limit(8)
        .populate('category')
        .populate('subs')
        .populate('postedBy')
        .exec();

    res.json(related);
}


//THIS BLOCK MAKES QUERIES IN SEPARATE WAY: ONLY BY CATEGORY, ONLY BY PRICE, AND ONLY BY VOLUME

// const handleQuery = async (req, res, query) => {
//     const products = await Product.find({ $text: { $search: query } })
//         .populate('category', '_id name')
//         .populate('subs', '_id name')
//         .exec();

//     res.json(products)
// }

// const handlePrice = async (req, res, price) => {
//     try {
//         let products = await Product.find({
//             price: {
//                 $gte: price[0],
//                 $lte: price[1]
//             }
//         })
//             .populate('category', '_id name')
//             .populate('subs', '_id name')
//             .exec();

//         res.json(products)
//     } catch (err) {
//         console.log(err)
//     }
// }

// const handleVolume = async (req, res, volume) => {
//     try {
//         let products = await Product.find({
//             volume: {
//                 $gte: volume[0],
//                 $lte: volume[1]
//             }
//         })
//             .populate('category', '_id name')
//             .populate('subs', '_id name')
//             .exec();

//         res.json(products)
//     } catch (err) {
//         console.log(err)
//     }
// }

// const handleCategory = async (req, res, category) => {
//     try {
//         let products = await Product.find({ category })
//             .populate('category', '_id name')
//             .populate('subs', '_id name')
//             .exec();

//         res.json(products)
//     } catch (err) {
//         console.log(err)
//     }
// }


// exports.searchFilters = async (req, res) => {
//     const { query, price, volume, category } = req.body;

//     if (query) {
//         console.log("query", query);
//         await handleQuery(req, res, query)
//     }

//     if (price !== undefined) {
//         console.log("price is ", price)
//         await handlePrice(req, res, price)
//     }

//     if (volume) {
//         console.log("volume is ", volume)
//         await handleVolume(req, res, volume)
//     }

//     if (category) {
//         console.log("category is ", category)
//         await handleCategory(req, res, category)
//     }
// }



exports.searchFilters = (req, res) => {
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : 'asc';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);

    let findArgs = {}

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {

            if (key === "volume") {
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                }
            } else {
                findArgs[key] = req.body.filters[key]
            }
        }
    }

    Product.find(findArgs)
        .populate('category')
        .populate('subs')
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, products) => {
            if (err) return res.status(400).json({
                success: false, err
            })
            res.status(200).json({
                success: true,
                products,
                postSize: products.length
            })
        })
};

