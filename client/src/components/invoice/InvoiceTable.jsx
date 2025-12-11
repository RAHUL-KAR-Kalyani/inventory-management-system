import { Pen, Printer, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { deleteInvoice, setInvoices } from '../../redux/invoicesSlice';
import { INVOICE_ENDPOINT } from '../../utils/constant';

export const refreshPage = async (dispatch) => {
    try {
        // console.log("refresh clicked");
        // console.log(INVOICE_ENDPOINT, 'invoice endpoint');
        const res = await axios.get(`${import.meta.env.VITE_INVOICE_ENDPOINT}/get-invoice`, { withCredentials: true });
        // console.log(res.data);
        // console.log(res.data.success);
        if (res.data.success) {
            dispatch(setInvoices(res.data.invoices));
            toast.success(res?.data?.message);
        }
    } catch (error) {
        // console.log(error);
        toast.error(error.response?.data?.message);
    }
};

const InvoiceTable = () => {
    const { invoices, searchInvoiceByText } = useSelector(store => store.invoices);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [filteredInvoices, setFilteredInvoices] = useState(invoices);

    useEffect(() => {
        if (!invoices) return;
        const filteredInvoices = invoices.filter((invoice) => {
            if (!searchInvoiceByText) {
                return true;
            }
            // console.log(invoice.customer.name, 'customer name')
            // return invoice._id.toLowerCase().includes(searchInvoiceByText?.toLowerCase());
            return invoice.customer.name?.toLowerCase().includes(searchInvoiceByText.toLowerCase());
        });
        setFilteredInvoices(filteredInvoices);
    }, [invoices, searchInvoiceByText]);

    const updateInvoiceHandler = (id) => {
        // console.log('clicked update invoice');
        navigate(`/invoice/update-invoice/${id}`);
    };

    const printInvoiceHandler = (id) => {
        // console.log('clicked print invoice');
        navigate(`/invoice/print-invoice/${id}`);
    };

    const deleteInvoiceHandler = async (id) => {
        // console.log('clicked delete invoice');
        try {
            const res = await axios.delete(`${import.meta.env.VITE_INVOICE_ENDPOINT}/delete-invoice/${id}`, { withCredentials: true });
            // console.log(res.data);
            if (res.data.success) {
                dispatch(deleteInvoice({ _id: id }));
                refreshPage(dispatch);
                toast.success(res.data.message);
                alert("Invoice Deleted Successfully");
            }
        } catch (error) {
            // console.log(error);
            toast.error(error.response?.data?.message || 'Failed to delete invoice');
        }
    };

    return (
        <div className="overflow-x-auto min-w-60">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-200 shadow-sm">
                <thead className="bg-gray-50">
                    <tr>
                        {/* <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th> */}
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer name</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total GST</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grand Total</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filteredInvoices?.map((invoice) => (
                        <tr key={invoice._id} className="hover:bg-gray-50 transition-colors">
                            {/* <td className="px-4 py-2 capitalize whitespace-nowrap text-sm text-gray-700">{invoice._id}</td> */}
                            <td className="px-4 py-2 capitalize whitespace-nowrap text-sm text-gray-700">{invoice?.customer?.name}</td>
                            <td className="px-4 py-2 capitalize whitespace-nowrap text-sm text-gray-700">{invoice?.subtotal}</td>
                            <td className="px-4 py-2 capitalize whitespace-nowrap text-sm text-gray-700">{invoice?.gstTotal}%</td>
                            <td className="px-4 py-2 capitalize whitespace-nowrap text-sm text-gray-700">{invoice?.discount}</td>
                            <td className="px-4 py-2 capitalize whitespace-nowrap text-sm text-gray-700">{invoice?.grandTotal}</td>
                            <td className="px-4 py-2 capitalize whitespace-nowrap text-sm text-gray-700">{invoice?.paymentStatus}</td>
                            <td className="px-4 py-2 whitespace-nowrap flex gap-6">
                                <div className="relative">
                                    <Trash size={15} className="cursor-pointer" onClick={() => deleteInvoiceHandler(invoice._id)} />
                                    <span className="tooltip-text">Delete</span>
                                </div>
                                <div className="relative">
                                    <Pen size={15} className="cursor-pointer" onClick={() => updateInvoiceHandler(invoice._id)} />
                                    <span className="tooltip-text">Update</span>
                                </div>
                                <div className="relative">
                                    <Printer size={15} className="cursor-pointer" onClick={() => printInvoiceHandler(invoice._id)} />
                                    <span className="tooltip-text">Print</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceTable;
