import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useGetDashboard from "../hooks/useGetDashboard";
import { Line, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    LineElement,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

const Dashboard = () => {
    useEffect(() => {
        document.title = "Inventory Management System";
    }, []);

    useGetDashboard();

    const { dashboard } = useSelector((state) => state.dashboard);

    if (!dashboard || Object.keys(dashboard).length === 0) {
        return <p>Loading dashboard...</p>;
    }

    const salesData = {
        labels: dashboard.salesData?.map((s) => s._id) || [],
        datasets: [
            {
                label: "Total Sales",
                data: dashboard.salesData?.map((s) => s.totalSales) || [],
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                fill: true,
                tension: 0.3,
            },
        ],
    };

    const stockChartData = {
        labels: dashboard.stockData?.map((p) => p.name) || [],
        datasets: [
            {
                label: "Stock Available",
                data: dashboard.stockData?.map((p) => p.stock) || [],
                backgroundColor: "rgba(153,102,255,0.6)",
            },
        ],
    };

    return (
        <div className="flex flex-col gap-10 p-2">
            <div className='flex flex-row'>
                <div className='mx-auto my-auto w-auto'>
                    <div className="card">
                        {dashboard.totalCustomers <= 5 ? (
                            <div className="flex text-md gap-3 animate-pulse text-red-600">
                                <p>⚠️ Customers: {dashboard.totalCustomers}</p>
                            </div>
                        ) : (
                            <h3 className="animate-pulse text-green-600">
                                Customers: {dashboard.totalCustomers}
                            </h3>
                        )}
                    </div>
                    <div className="card">
                        {dashboard.stockData?.length <= 5 ? (
                            <div className="flex text-md gap-3 animate-pulse text-red-600">
                                <p>⚠️ Products: {dashboard.stockData?.length} </p>
                            </div>
                        ) : (
                            <h3 className="animate-pulse text-green-600">
                                Products: {dashboard.stockData?.length}
                            </h3>
                        )}
                    </div>
                </div>

                <div className='mx-auto my-auto w-auto items-center justify-center'>
                    <h3 className="pb-2">⚠️ Stock Alerts</h3>
                    {dashboard.lowStockProducts?.length > 0 ? (
                        dashboard.lowStockProducts.map((p) => (
                            <p key={p._id} className="p-0 shadow-none m-0 animate-pulse text-red-600">
                                <span className="capitalize">{p.name}</span> has only {p.stock} left (reorder level {p.reorderLevel})
                            </p>
                        ))
                    ) : (
                        <p className="text-md animate-pulse text-green-600">All products are sufficiently stocked ✅</p>
                    )}
                </div>
            </div>
            <div className='flex flex-row'>
                <div className='mx-auto my-auto w-100 h-52 '>
                    <h3>Stock per Item</h3>
                    {dashboard.stockData?.length > 0 ? (
                        <Bar data={stockChartData} />
                    ) : (
                        <p>No stock data available</p>
                    )}
                </div>
            </div>
            <div className='flex flex-row'>
                <div className='mx-auto my-auto w-100'>
                    <h3>Sales Trend</h3>
                    {dashboard.salesData?.length > 0 ? (
                        <Line data={salesData} />
                    ) : (
                        <p>No sales data available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
