const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    texts: {
        type: Array,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    creditCard:{
        type: String,
        required: true
    },
    verify:{
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Customer = mongoose.model('customers', CustomerSchema);

module.exports = Customer;