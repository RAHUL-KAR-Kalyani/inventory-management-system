/** @type {import("mongoose").Model<any>} */

const productModel = require("../models/productModel");

const addProduct = async (req, res) => {
    try {
        const { name, sku, category, price, stock, reorderLevel } = req.body;

        //validation
        if (!name || !sku || !price) {
            return res.status(400).json({
                message: "name, sku and price are required",
                success: false
            });
        }

        // existing product check via sku
        const existingProduct = await productModel.findOne({ sku });
        if (existingProduct) {
            return res.status(400).json({
                message: 'Product with this SKU already exists',
                success: false
            });
        }

        // create and save new product
        const newProduct = await productModel.create({ name, sku, category, price, stock, reorderLevel });
        await newProduct.save();

        return res.status(201).json({
            message: 'Product added successfully',
            product: newProduct,
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

const getProducts = async (req, res) => {

    try {
        const products = await productModel.find();

        if (products.length === 0 || !products) {
            return res.status(200).json({
                message: 'No products found',
                success: false
            });
        }

        console.log(products.length, 'products found');

        return res.status(200).json({
            message: 'Products fetched successfully',
            products: products,
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

const getProductsById = async (req, res) => {
    try {
        const productId = req.params.id;
        const products = await productModel.findById(productId);

        if (!products) {
            return res.status(404).json({
                message: 'Product not found',
                success: false
            });
        }

        return res.status(200).json({
            message: 'Products fetched successfully',
            product: products,
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

const updateProduct = async (req, res) => {
    try {
        console.log("updatedProduct");
        const productId = req.params.id;
        const updatedProduct = req.body;
        const newproduct = await productModel.findByIdAndUpdate(productId, updatedProduct, { new: true });

        if (!newproduct) {
            return res.status(404).json({
                message: 'Unable to find Product to updated',
                success: false
            });
        }

        return res.status(200).json({
            message: 'Product updated successfully',
            product: newproduct,
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

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await productModel.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({
                message: 'Unable to find Product to delete',
                success: false
            });
        }

        return res.status(200).json({
            message: 'Product deleted successfully',
            product: deleteProduct,
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

module.exports = { addProduct, getProducts, getProductsById, updateProduct, deleteProduct };