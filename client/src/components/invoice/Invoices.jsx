import React, { useEffect, useState } from 'react'
import { RefreshCcw } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import useGetAllInvoices from '../../hooks/useGetAllInvoices';
import { useDispatch } from 'react-redux';
import { setSearchInvoiceByText } from '../../redux/invoicesSlice';
import InvoiceTable, { refreshPage } from './InvoiceTable';

const Invoices = () => {
    useEffect(() => {
        document.title = "Invoices";
    }, []);
    useGetAllInvoices();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSearchInvoiceByText(input));
    }, [input]);
    return (
        <div className='min-w-60'>
            <div className='flex flex-col gap-6'>
                <div className='flex items-center gap-3'>
                    <input type="text" className='p-2 outline-none' placeholder='Search invoice by name' onChange={(e) => setInput(e.target.value)} />
                    <button onClick={() => navigate('/invoice/add-invoice')} className='bg-gray-700 text-white text-center p-2'>add new invoice</button>

                    <button onClick={() => refreshPage(dispatch)} className="flex items-center bg-gray-700 text-white text-center p-2">
                        <RefreshCcw size={20} className='pe-1' />
                        Refresh
                    </button>
                </div>
                <InvoiceTable />
            </div>
        </div>
    )
}

export default Invoices