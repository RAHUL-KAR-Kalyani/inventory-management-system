const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    reorderLevel: {
        type: Number,
        default: 5
    }

}, { timestamps: true });

const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;