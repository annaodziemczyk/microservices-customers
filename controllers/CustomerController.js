const boom = require('boom');
const Joi = require('joi');
// Get Data Models
const Customer = require('../models/Customer');
var _ = require('lodash');


const addressSchema = Joi.object({
    addressLine1:Joi.string().required(),
    addressLine2: Joi.string(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    postcode: Joi.string().required()
});

const contactSchema= Joi.object({
    telnumber:Joi.string().required(),
    type: Joi.string().required()
});

const customerSchema = Joi.object({
    userId: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    primaryAddress: addressSchema.required(),
    primaryContactNumber: contactSchema.required()
});


exports.getCustomers = async (req, reply) => {
    try {
        return await Customer.find();

    } catch (err) {
        throw boom.boomify(err);
    }
};

exports.getSingleCustomer = async (req, reply) => {
    try {
        const id = req.params.id;
        return await Customer.findOne({userId:id}).exec();

    } catch (err) {
        throw boom.boomify(err);
    }
};


exports.addCustomer = async (req, reply) => {
    try {
        let customer = await Joi.validate(req.body, customerSchema, { abortEarly: false });

        return await new Customer(customer).save();

    } catch (err) {
        throw boom.boomify(err);
    }
};

exports.updatePrimaryCustomerDetails = async (req, reply) => {
    try {
        const id = req.params.id;
        let updatedCustomer = await Joi.validate(req.body, customerSchema, { abortEarly: false });
        return await Customer.findOneAndUpdate({userId:id}, updatedCustomer, {new:true});

    } catch (err) {
        throw boom.boomify(err);
    }
};

exports.addAddress = async (req, reply) => {
    try {
        const id = req.params.id;
        let address = await Joi.validate(req.body, addressSchema, { abortEarly: false });
        let customer = await Customer.findOne({userId:id, "adresses.addressLine1":address.addressLine1});
        if(customer){
            throw boom.boomify(new Error("The specified address already exists"));
        }

        return await Customer.findOneAndUpdate(
            { _id: id },
            { $push: { addresses: address } },
            {new:true}).exec();


    } catch (err) {
        throw boom.boomify(err);
    }
};

exports.removeAddress = async (req, reply) => {
    try {
        const id = req.params.id;
        const addressId = req.params.addressId;
        return await Customer.findOneAndUpdate(
            { _id: id },
            { $pull: {addresses: { "_id": addressId}}}, {new:true}).exec();

    } catch (err) {
        throw boom.boomify(err);
    }
};

exports.addContactNumber = async (req, reply) => {
    try {
        const id = req.params.id;
        let contact = await Joi.validate(req.body, contactSchema, { abortEarly: false });
        let customer = await Customer.findOne({userId:id, "contactNumbers.telnumber":contact.telnumber});
        if(customer){
            throw boom.boomify(new Error("The specified contact number already exists"));
        }

        return await Customer.findOneAndUpdate(
            { _id: id },
            { $push: { contactNumbers: contact } },
            {new:true}).exec();


    } catch (err) {
        throw boom.boomify(err);
    }
};

exports.removeContactNumber = async (req, reply) => {
    try {
        const id = req.params.id;
        const contactId = req.params.contactId;
        return await Customer.findOneAndUpdate(
            { _id: id },
            { $pull: {contactNumbers: { "_id": contactId}}}, {new:true}).exec();

    } catch (err) {
        throw boom.boomify(err);
    }
};

exports.makePrimaryAddress = async (req, reply) => {
    try {
        const id = req.params.id;
        let updatedCustomer = await Joi.validate(req.body, customerSchema, { abortEarly: false });
        customer = await Customer.findOne({userId:id}, updatedCustomer);
        cus

    } catch (err) {
        throw boom.boomify(err);
    }
};


exports.deleteCustomerDetails = async (req, reply) => {
    try {
        const id = req.params.id;

        const customer = await Customer.findOneAndRemove({userId:id});
        if(customer){
            return customer;
        }

        throw boom.boomify(new Error("Customer was not found."));

    } catch (err) {
        throw boom.boomify(err);
    }
};



