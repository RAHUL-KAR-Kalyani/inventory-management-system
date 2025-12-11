const customerModel = require("../models/customerModel.js");
const productModel = require("../models/productModel.js");
const invoiceModel = require("../models/invoiceModel.js");

const getDashboardData = async (req, res) => {
    try {
        // 🔹 Total Customers
        const totalCustomers = await customerModel.countDocuments();
        // console.log(totalCustomers);

        // 🔹 Stocks available per item
        const stockData = await productModel.find({}, "name stock reorderLevel");
        // console.log(stockData);

        // 🔹 Low stock alerts
        const lowStockProducts = await productModel.find({
            $expr: { $lte: ["$stock", "$reorderLevel"] }
        });
        // console.log(lowStockProducts);

        // 🔹 Total Sales (daily aggregation for line chart)
        const salesData = await invoiceModel.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    totalSales: { $sum: "$grandTotal" }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        // console.log(salesData);

        return res.status(200).json({
            message: "Dashboard data fetched successfully",
            success: true,
            dashboard: {
                totalCustomers,
                stockData,
                lowStockProducts,
                salesData
            }
        });
    } catch (err) {
        // console.error(err);
        return res.status(500).json({ message: "Server Error", success: false });
    }
};

module.exports = { getDashboardData };
