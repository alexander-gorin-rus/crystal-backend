const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Название категории обязательно'
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        index: true
    },
    // subs: {
    //     type: ObjectId,
    //     ref: "Sub"
    // },
},
    // {
    //     toJSON: { virtuals: true },
    //     toObject: { virtuals: true }
    // },
    { timestamps: true }
);

//Cascade delete subcategories when a category is deleted
// categorySchema.pre('remove', async function (next) {
//     console.log("Категория и все подкатегории вместе с товарами успешно удалены")
//     await this.model("Sub").deleteMany({ parent: this._id });
//     next();
// })

// //Reverse populate with virtuals
// categorySchema.virtual('sub', {
//     ref: "Sub",
//     localField: '_id',
//     foreignField: 'category',
//     justOne: false
// })

module.exports = mongoose.model("Category", CategorySchema);