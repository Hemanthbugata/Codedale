const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    image: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    brand: String,
    stock: Number,
    rating: {
        type: Number,
        default: 0,
    },
    images: [String],
    rating: {
        type: Number,
        default: 0,
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);