import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addInvoice } from "../../redux/invoicesSlice";
import useGetAllProducts from "../../hooks/useGetAllProducts";
import useGetAllCustmers from "../../hooks/useGetAllCustomers";
import { INVOICE_ENDPOINT } from "../../utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

const AddInvoice = () => {
    useEffect(() => {
        document.title = "Add Invoice";
    }, []);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useGetAllProducts();
    useGetAllCustmers();

    const products = useSelector((state) => state.products.products);
    const customers = useSelector((state) => state.customers.customers);

    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Cash");
    const [paymentStatus, setPaymentStatus] = useState("Due");
    const [items, setItems] = useState([
        { product: "", quantity: 1, price: 0, lineTotal: 0 },
    ]);
    const [cgst, setCgst] = useState(9);
    const [sgst, setSgst] = useState(9);
    const [gstTotal, setGstTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [loading, setLoading] = useState(false);

    // Update GST total dynamically
    useEffect(() => {
        setGstTotal(Number(cgst) + Number(sgst));
    }, [cgst, sgst]);

    // Update line totals whenever quantity or price changes
    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        if (field === "product") {
            const product = products.find((p) => p._id === value);
            newItems[index].product = value;
            newItems[index].price = product?.price || 0;
        } else if (field === "quantity") {
            newItems[index].quantity = Number(value);
        }
        newItems[index].lineTotal =
            newItems[index].price * newItems[index].quantity;
        setItems(newItems);
    };

    const addNewItem = () => {
        setItems([...items, { product: "", quantity: 1, price: 0, lineTotal: 0 }]);
    };

    const removeItem = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    const subtotal = items.reduce((acc, item) => acc + item.lineTotal, 0);
    const grandTotal = subtotal + subtotal * (gstTotal / 100) - discount;

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_INVOICE_ENDPOINT}/create-invoice`,
                {
                    customer: selectedCustomer,
                    items,
                    cgst,
                    sgst,
                    gstTotal,
                    discount,
                    paymentMethod,
                    paymentStatus
                },
                { withCredentials: true }
            );
            if (response.data.success) {
                dispatch(addInvoice(response.data.invoice));
                toast.success("Invoice created successfully");
                setSelectedCustomer("");
                setItems([{ product: "", quantity: 1, price: 0, lineTotal: 0 }]);
                setCgst(0);
                setSgst(0);
                setGstTotal(0);
                setDiscount(0);
                setPaymentMethod("Cash");
                window.print();
                navigate("/invoices");
            } else {
                toast.error("Failed to create invoice");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message);
        }
        setLoading(false);
    };

    const printInvoiceHandler = () => {
        window.print();
    };

    const generateInvoiceNumber = () => {
        const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
        return `INV-2025-${randomNum}`;
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-10">
            <div className="w-full max-w-5xl rounded-2xl  overflow-hidden print-area">
                {/* Header */}
                <div className="bg-linear-to-r from-blue-700 to-blue-500 text-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between gap-6">
                    <div className="flex flex-col">
                        <p className="text-2xl font-bold tracking-normal uppercase">
                            YOUR SHOP
                        </p>
                        <div className="text-sm opacity-80 mt-1 flex flex-row gap-1 items-center">
                            <span><MapPin size={15} /></span>
                            <span>Kolkata</span>
                        </div>
                    </div>
                    <div className="text-sm space-y-1 sm:text-right">
                        <p>Invoice : {generateInvoiceNumber()}</p>
                        <p>Date: {new Date().toLocaleDateString()}</p>
                    </div>
                </div>

                {/* Body */}
                <form onSubmit={submitHandler} className="p-6 sm:p-8 space-y-6">
                    {/* Customer & Payment */}
                    <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-1">
                            <label className="block text-[11px] uppercase text-gray-500 font-semibold mb-1">
                                Bill To
                            </label>
                            <div className="relative">
                                <select className="border p-2 rounded w-full print:hidden" value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)} required >
                                    <option value="">Select Customer</option>
                                    {customers.map((c) => (
                                        <option key={c._id} value={c._id}>
                                            {c.name.charAt(0).toUpperCase() + c.name.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                <span className="hidden print:inline">
                                    {customers.find((c) => c._id === selectedCustomer)?.name || ""}
                                </span>
                            </div>
                        </div>

                        <div className="flex-1">
                            <label className="block text-[11px] uppercase text-gray-500 font-semibold mb-1">
                                Payment Method
                            </label>
                            <div className="relative">
                                <select className="border p-2 rounded w-full print:hidden" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} >
                                    <option value="Cash">Cash</option>
                                    <option value="Card">Card</option>
                                    <option value="UPI">UPI</option>
                                </select>
                                <span className="hidden print:inline">
                                    {paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}
                                </span>
                            </div>
                        </div>
                        <div className="flex-1">
                            <label className="block text-[11px] uppercase text-gray-500 font-semibold mb-1">
                                Payment Status
                            </label>
                            <select className="border p-2 rounded w-full" value={paymentStatus} onChange={(e) => {
                                console.log("Status changed:", e.target.value)
                                console.log("Status")
                                setPaymentStatus(e.target.value)
                            }} >
                                <option value="Paid">Paid</option>
                                <option value="Due">Due</option>
                            </select>
                        </div>
                    </div>

                    {/* Product Table */}
                    <div>
                        <p className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-2">
                            Products
                        </p>
                        <div className="overflow-x-auto rounded-lg border border-gray-200">
                            <table className="w-full text-sm">
                                <thead className="bg-gray-50 text-[11px] uppercase tracking-wider text-gray-500">
                                    <tr>
                                        <th className="text-left px-3 py-3">Product</th>
                                        <th className="text-center px-3 py-3">Qty</th>
                                        <th className="text-right px-3 py-3">Price / Qty</th>
                                        <th className="text-right px-3 py-3">Total</th>
                                        <th className="text-center px-3 py-3 print:hidden">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items.map((item, index) => (
                                        <tr key={index} className="border-t">
                                            <td className="px-3 py-2">
                                                <div className="relative">
                                                    <select className="border p-1 rounded w-full print:hidden" value={item.product} onChange={(e) => handleItemChange(index, "product", e.target.value)} required >
                                                        <option value="">Select Product</option>
                                                        {products.map((p) => (
                                                            <option key={p._id} value={p._id}>
                                                                {p.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <span className="hidden print:inline">
                                                        {products.find((p) => p._id === item.product)?.name || ""}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="text-center px-3 py-2">
                                                <input type="number" className="border p-1 w-16 text-center rounded print:hidden" value={item.quantity} min="1" onChange={(e) => handleItemChange(index, "quantity", e.target.value)} required />
                                                <span className="hidden print:inline">{item.quantity}</span>
                                            </td>
                                            <td className="text-right px-3 py-2">
                                                {item.price.toFixed(2)}
                                            </td>
                                            <td className="text-right px-3 py-2">{item.lineTotal.toFixed(2)}</td>
                                            <td className="text-center px-3 py-2 print:hidden">
                                                <button type="button" className="text-red-500 cursor-pointer" onClick={() => removeItem(index)} >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <button type="button" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded print:hidden" onClick={addNewItem} >
                            Add Item
                        </button>
                    </div>

                    {/* Totals */}
                    <div className="flex justify-end mt-4 bg-transparent">
                        <div className="w-full sm:w-[300px] bg-transparent p-4 rounded-xl space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Subtotal</span>
                                <span>{subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">CGST (%)</span>
                                <span className="print:inline hidden">{cgst}%</span>
                                <input type="number" value={cgst} onChange={(e) => setCgst(Number(e.target.value))} className="border p-1 rounded w-16 text-right print:hidden" />
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">SGST (%)</span>
                                <span className="print:inline hidden">{sgst}%</span>
                                <input type="number" value={sgst} onChange={(e) => setSgst(Number(e.target.value))} className="border p-1 rounded w-16 text-right print:hidden" />
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">GST Total (%)</span>
                                <span className="print:inline hidden">{gstTotal}%</span>
                                <input type="number" value={gstTotal} readOnly className="border p-1 rounded w-16 text-right print:hidden" />
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Discount</span>
                                <input type="number" value={discount} onChange={(e) => setDiscount(Number(e.target.value))} className="border p-1 rounded w-16 text-right print:hidden" />
                                <span className="print:inline hidden">{discount}</span>
                            </div>
                            <div className="flex justify-between pt-3 border-t border-dashed font-bold text-base">
                                <span>Grand Total</span>
                                <span>{grandTotal.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 mt-6 print:hidden">
                        <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold no-print" disabled={loading} >
                            {loading ? "Creating Invoice..." : "Create Invoice"}
                        </button>
                        <button type="button" className="w-full py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-semibold no-print" onClick={printInvoiceHandler} >
                            Print Invoice
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddInvoice;
