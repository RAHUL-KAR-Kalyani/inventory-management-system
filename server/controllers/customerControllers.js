/** @type {import("mongoose").Model<any>} */

const customerModel = require("../models/customerModel");

const addCustomer = async (req, res) => {
    try {
        const { name, phone, email, address, GSTIN } = req.body;

        if (!name || !phone) {
            return res.status(400).json({
                message: "name, and phone are required",
                success: false
            });
        }

        const existingCustomer = await customerModel.findOne({ phone });
        if (existingCustomer) {
            return res.status(400).json({
                message: 'phone already exists',
                success: false
            });
        }

        const newCustomer = await customerModel.create({ name, phone, email, address, GSTIN });
        await newCustomer.save();

        return res.status(201).json({
            message: 'new customer added successfully',
            customer: newCustomer,
            success: true
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
}


const getCustomer = async (req, res) => {
    try {
        const customers = await customerModel.find().sort({ createdAt: -1 });
        if (customers.length === 0 || !customers) {
            return res.status(200).json({
                message: 'No customer found',
                success: false
            });
        }

        return res.status(200).json({
            message: 'Customers fetched successfully',
            customers: customers,
            success: true
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
}

const getCutsomerById = async (req, res) => {
    try {
        const customerId = req.params.id;
        const customers = await customerModel.findById(customerId);

        if (!customers) {
            return res.status(404).json({
                message: 'customer not found',
                success: false
            });
        }

        return res.status(200).json({
            message: 'Customers fetched successfully',
            customer: customers,
            success: true
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
}

const updateCustomer = async (req, res) => {
    try {
        const customerId = req.params.id;
        const updatedCustomer = req.body;
        const newCustomer = await customerModel.findByIdAndUpdate(customerId, updatedCustomer, { new: true });

        if (!newCustomer) {
            return res.status(404).json({
                message: 'Unable to find Customer to updated',
                success: false
            });
        }

        return res.status(200).json({
            message: 'Products updated successfully',
            customer: newCustomer,
            success: true
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
}

const deleteCustomer = async (req, res) => {
    try {
        const customerId = req.params.id;
        const deletedCustomer=await customerModel.findByIdAndDelete(customerId);

        if(!deletedCustomer){
            return res.status(404).json({
                message: 'Unable to find customer to delete',
                success: false
            });
        }

        return res.status(200).json({
            message: 'Customer deleted successfully',
            customer: deletedCustomer,
            success: true
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
}

module.exports = { addCustomer, getCustomer, getCutsomerById, updateCustomer,deleteCustomer };