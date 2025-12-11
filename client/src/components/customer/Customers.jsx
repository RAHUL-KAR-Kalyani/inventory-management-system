import React, { useEffect, useState } from 'react'
import useGetAllCustmers from '../../hooks/useGetAllCustomers'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchCustomerByText } from '../../redux/customersSlice';
import { RefreshCcw } from 'lucide-react';
import CustomerTable, { refershPage } from './CustomerTable';

const Customers = () => {
    useEffect(() => {
        document.title = "Customers";
    }, []);
    useGetAllCustmers();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSearchCustomerByText(input));
    }, [input]);

    return (
        <div className='min-w-60'>
            <div className='flex flex-col gap-6'>
                <div className='flex items-center gap-3'>
                    <input type="text" className='p-2 outline-none' placeholder='Search products' onChange={(e) => setInput(e.target.value)} />
                    <button onClick={() => navigate('/customer/add-customer')} className='bg-gray-700 text-white text-center p-2'>add new customer</button>

                    <button onClick={() => refershPage(dispatch)} className="flex items-center bg-gray-700 text-white text-center p-2">
                        <RefreshCcw size={20} className='pe-1' />
                        Refresh
                    </button>
                </div>
                <CustomerTable />
            </div>
        </div>
    )
}

export default Customers