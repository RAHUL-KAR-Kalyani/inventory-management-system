const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique:true
    },
    address: {
        type: String
    },
    GSTIN: {
        type: String,
        unique:true
    },
}, { timestamps: true });

const customerModel = mongoose.model('Customer', customerSchema);
module.exports = customerModel;
