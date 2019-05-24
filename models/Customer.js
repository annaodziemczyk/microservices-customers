const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    addressLine1: {
        type:String,
        required: true
    },
    addressLine2: {
        type:String,
        required: false
    },
    city: {
        type:String,
        required: true
    },
    country: {
        type:String,
        required: true
    },
    postcode: {
        type:String,
        required: true
    }
});

const contactNumberSchema = new mongoose.Schema({
    telnumber: {
        type:String,
        required: true
    },
    type: {
        type:String,
        enum: ['MOBILE', 'LANDLINE'],
        default: 'MOBILE'
    }
});

const customerSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: false,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    primaryAddress:addressSchema,
    primaryContactNumber:contactNumberSchema,
    addresses: [
        addressSchema
    ],
    contactNumbers: [
        contactNumberSchema
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
}, {
    versionKey: false,
    usePushEach:true
});

module.exports = mongoose.model('Customer', customerSchema);