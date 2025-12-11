const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        lineTotal: {
            type: Number,
            required: true
        }
    }],
    subtotal: {
        type: Number,
        required: true
    },
    cgst: {
        type: Number,
        required: true,
        default: 9
    },
    sgst: {
        type: Number,
        required: true,
        default: 9
    },
    gstTotal: {
        type: Number,
        default: 18
    },
    discount: {
        type: Number,
        default: 0
    },
    grandTotal: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Paid', 'Due'],
        default: 'Due'
    },
    paymentMethod: {
        type: String,
        enum: ['Cash', 'Card', 'UPI'],
        default: 'Cash'
    }
}, { timestamps: true });

const invoiceModel = mongoose.model('Invoice', invoiceSchema);
module.exports = invoiceModel;