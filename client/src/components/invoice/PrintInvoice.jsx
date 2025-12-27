import React, { useEffect } from 'react'

export const printInvoiceHandler = (e) => {
    e.preventDefault();
    window.print();
};


const PrintInvoice = () => {
    useEffect(() => {
        document.title = "Print Invoice";
    }, []);
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-10 ">
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden print-area">
                <form className="invoice-print-section" onSubmit={printInvoiceHandler}>
                    {/* Header */}
                    <div className="bg-linear-to-r from-blue-700 to-blue-500 text-white p-6 sm:p-8 flex flex-col sm:flex-row justify-between gap-6">
                        <div>
                            <h1 className="text-2xl font-bold tracking-widest uppercase">
                                YOUR SHOP
                            </h1>
                            <p className="text-sm opacity-80 mt-1">Shop Address</p>
                        </div>

                        <div className="text-sm space-y-1 sm:text-right">
                            <span className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-[11px] uppercase tracking-wider">
                                <span className="h-2 w-2 bg-green-400 rounded-full"></span>
                                Invoice
                            </span>
                            <p>Invoice #: INV-0001</p>
                            <p>Date: 03 Dec 2025</p>
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
                                <p className="font-medium">Customer Name</p>
                                <p className="text-sm text-gray-500">customer@email.com</p>
                                <p className="text-sm text-gray-500">Customer Address</p>
                            </div>

                            <div className="flex-1">
                                <p className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-2">
                                    From
                                </p>
                                <p className="font-medium">Your Company Name</p>
                                <p className="text-sm text-gray-500">you@example.com</p>
                                <p className="text-sm text-gray-500">Company Address</p>
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
                                        <tr className="border-t">
                                            <td className="px-3 py-2">Product Name 1</td>
                                            <td className="text-center px-3 py-2">2</td>
                                            <td className="text-right px-3 py-2">500.00</td>
                                            <td className="text-right px-3 py-2">1,000.00</td>
                                        </tr>

                                        <tr className="border-t bg-gray-50">
                                            <td className="px-3 py-2">Product Name 2</td>
                                            <td className="text-center px-3 py-2">1</td>
                                            <td className="text-right px-3 py-2">750.00</td>
                                            <td className="text-right px-3 py-2">750.00</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Totals */}
                        <div className="flex justify-end">
                            <div className="w-full sm:w-[280px] bg-gray-50 p-4 rounded-xl space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span>1,750.00</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">CGST (9%)</span>
                                    <span>315.00</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">SGST (9%)</span>
                                    <span>315.00</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">GST Total (18%)</span>
                                    <span>315.00</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">Discount</span>
                                    <span>-65.00</span>
                                </div>

                                <div className="flex justify-between pt-3 border-t border-dashed font-bold text-base">
                                    <span>Grand Total</span>
                                    <span>2,000.00</span>
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
                    <button className='no-print' type='submit'>print</button>
                </form>
            </div>
        </div>
    )
}

export default PrintInvoice
