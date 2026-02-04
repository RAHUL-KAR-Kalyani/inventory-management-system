import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const printInvoiceHandler = (e) => {
    e.preventDefault();
    window.print();
};

const PrintInvoice = () => {
    useEffect(() => {
        document.title = "Print Invoice";
    }, []);

    const { id } = useParams();
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoice = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${import.meta.env.VITE_INVOICE_ENDPOINT}/get-invoicebyid/${id}`, { withCredentials: true });
                if (res.data.success) {
                    setInvoice(res.data.invoice);
                } else {
                    toast.error(res.data.message || 'Invoice not found');
                    navigate('/invoices');
                }
            } catch (err) {
                console.error(err);
                toast.error(err.response?.data?.message || 'Failed to load invoice');
                navigate('/invoices');
            }
            setLoading(false);
        }
        if (id) fetchInvoice();
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading invoice...</p>
            </div>
        )
    }

    if (!invoice) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Invoice not available.</p>
            </div>
        )
    }

    const { customer, items, subtotal, cgst, sgst, gstTotal, discount, grandTotal, paymentMethod, paymentStatus, createdAt } = invoice;

    const formattedDate = createdAt ? new Date(createdAt).toLocaleString() : '';

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-10 ">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden print-area">
                <form className="invoice-print-section" onSubmit={printInvoiceHandler}>
                    {/* Header */}
                    <div className="bg-linear-to-r from-blue-700 to-blue-500 text-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between gap-6">
                        <div>
                            <h1 className="text-2xl font-bold tracking-widest uppercase">
                                { /* Use shop/company name if available from invoice or fallback */}
                                MY SHOP
                            </h1>
                            <p className="text-sm opacity-80 mt-1">Kolkata</p>
                        </div>

                        <div className="text-sm space-y-1 sm:text-right">
                            <span className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-[11px] uppercase tracking-wider">
                                <span className="h-2 w-2 bg-green-400 rounded-full"></span>
                                Invoice
                            </span>
                            <p>Invoice #: {invoice._id}</p>
                            <p>Date: {formattedDate}</p>
                            <p className="text-xs">Payment: {paymentMethod} — <span className="font-medium">{paymentStatus}</span></p>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 sm:p-8 space-y-6">

                        {/* Bill Info */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <p className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-2">
                                    Bill To
                                </p>
                                <p className="font-medium capitalize">{customer?.name}</p>
                                {customer?.email && <p className="text-sm text-gray-500">{customer.email}</p>}
                                {customer?.phone && <p className="text-sm text-gray-500">+91-{customer.phone}</p>}
                                {customer?.address && <p className="text-sm text-gray-500">{customer.address}</p>}
                            </div>

                            <div className="flex-1">
                                <p className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-2">
                                    From
                                </p>
                                <p className="font-medium">My Company</p>
                                <p className="text-sm text-gray-500">me@gmail.com</p>
                                <p className="text-sm text-gray-500">Kolkata, West Bengal</p>
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
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {items && items.length > 0 ? items.map((it, idx) => (
                                            <tr key={idx} className="border-t border-gray-200 print:border-gray-200">
                                                <td className="px-3 py-2">{it.product?.name}</td>
                                                <td className="text-center px-3 py-2">{it.quantity}</td>
                                                <td className="text-right px-3 py-2">{Number(it.price).toFixed(2)}</td>
                                                <td className="text-right px-3 py-2">{Number(it.lineTotal).toFixed(2)}</td>
                                            </tr>
                                        )) : (
                                            <tr className="border-t print:border-gray-300">
                                                <td className="px-3 py-2" colSpan={4}>No items</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Totals */}
                        <div className="flex justify-end">
                            <div className="w-full sm:w-70 bg-gray-50 p-4 rounded-xl space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span>{Number(subtotal).toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">GST Total ({gstTotal}%)</span>
                                    <span>{(((subtotal) * (Number(gstTotal)) / 100)).toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">CGST ({cgst}%)</span>
                                    <span>{((subtotal) * (Number(cgst)) / 100).toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">SGST ({sgst}%)</span>
                                    <span>{((subtotal) * (Number(sgst)) / 100).toFixed(2)}</span>
                                </div>

                                {/* <div className="flex justify-between">
                                    <span className="text-gray-500">GST Total ({gstTotal}%)</span>
                                    <span>{(((subtotal) * (Number(gstTotal)) / 100)).toFixed(2)}</span>
                                </div> */}

                                <div className="flex justify-between">
                                    <span className="text-gray-500">Discount</span>
                                    <span>{Number(discount).toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between pt-3 border-t border-dashed font-bold text-base">
                                    <span>Grand Total</span>
                                    <span>{Number(grandTotal).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="border-t px-6 sm:px-8 py-4 flex flex-col sm:flex-row gap-3 justify-between items-center text-xs text-gray-500">
                        <p>Payment due within 7 days.</p>
                        <span className="px-3 py-1 rounded-full border text-[11px] uppercase tracking-wider">
                            Thank You
                        </span>
                    </div>
                    <div className="p-6">
                        <button className='no-print px-4 py-2 bg-blue-600 text-white rounded' type='submit'>Print</button>
                        <button type='button' className='no-print ml-2 px-4 py-2 bg-gray-500 text-white rounded' onClick={() => navigate('/invoices')}>Back</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PrintInvoice
