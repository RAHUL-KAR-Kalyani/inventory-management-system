/** @type {import("mongoose").Model<any>} */

const customerModel = require("../models/customerModel");
const invoiceModel = require("../models/invoiceModel");
const productModel = require("../models/productModel");


const createInvoice = async (req, res) => {
    try {
        const { customer, items, cgst = 9, sgst = 9, discount = 0, paymentStatus, paymentMethod = "cash" } = req.body;

        // Validate customer
        const validCustomer = await customerModel.findById(customer);
        if (!validCustomer) {
            return res.status(400).json({
                message: "Invalid customer ID. First add customer.",
                success: false
            });
        }

        let subtotal = 0;
        let lowStockAlerts = [];
        const invoiceItems = [];

        for (let item of items) {
            const product = await productModel.findById(item.product);
            if (!product) {
                return res.status(404).json({ message: "Product not found", success: false });
            }

            // Check stock
            if (product.stock < item.quantity) {
                return res.status(409).json({ message: `Not enough stock for ${product.name}`, success: false });
            }

            // Update stock
            product.stock -= item.quantity;
            await product.save();

            // Low stock alert
            if (product.stock <= product.reorderLevel) {
                lowStockAlerts.push({
                    productName: product.name,
                    currentStock: product.stock,
                    reorderLevel: product.reorderLevel,
                    message: `Low stock: ${product.name} has only ${product.stock} left (reorder level ${product.reorderLevel}).`
                });
            }

            // Calculate line total
            const lineTotal = product.price * item.quantity;
            subtotal += lineTotal;

            invoiceItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price,
                lineTotal
            });
        }

        // Calculate GST total and grand total
        const gstTotal = Number(cgst) + Number(sgst);
        let grandTotal = subtotal + (subtotal * gstTotal / 100) - Number(discount);
        grandTotal = Math.round(grandTotal * 100) / 100;

        // Create Invoice
        const newInvoice = await invoiceModel.create({
            customer,
            items: invoiceItems,
            subtotal,
            cgst,
            sgst,
            gstTotal,
            discount,
            grandTotal,
            paymentStatus,
            paymentMethod
        });

        // Populate invoice with customer and product details
        const populatedInvoice = await invoiceModel
            .findById(newInvoice._id)
            .populate("customer")
            .populate("items.product");

        return res.status(201).json({
            message: "Invoice created successfully",
            invoice: populatedInvoice,
            lowStockAlerts,
            success: true
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
};

const getInvoices = async (req, res) => {
    try {
        const invoices = await invoiceModel.find().populate('customer').populate('items.product');
        if (!invoices || invoices.length === 0) {
            return res.status(200).json({
                message: "Invoice not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Invoices fetched successfully",
            invoices,
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

const getInvoiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await invoiceModel.findById(id).populate('customer').populate('items.product');
        if (!invoice) {
            return res.status(404).json({
                message: "Invoice not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Invoice fetched successfully",
            invoice,
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

const updateInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedInvoice = req.body;
        const newInvoice = await invoiceModel.findByIdAndUpdate(id, updatedInvoice, { new: true });
        // const { paymentStatus, paymentMethod } = req.body;
        // const newInvoice=await invoiceModel.findByIdAndUpdate(id,{paymentStatus:req.body.paymentStatus,paymentMethod:req.body.paymentMethod}, { new: true });

        if (!newInvoice) {
            return res.status(404).json({
                message: 'Unable update Invoice. Invoice not found',
                success: false
            });
        }
        return res.status(200).json({
            message: 'Invoice updated successfully',
            invoice: newInvoice,
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

const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedInvoice = await invoiceModel.findByIdAndDelete(id);
        if (!deletedInvoice) {
            return res.status(404).json({
                message: "Invoice not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "Invoice deleted successfully",
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

module.exports = { createInvoice, getInvoices, getInvoiceById, updateInvoice, deleteInvoice };