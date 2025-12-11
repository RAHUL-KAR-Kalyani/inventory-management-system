import { Pen, Trash } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { deleteCustomer, setCustomers } from '../../redux/customersSlice';
import { CUSTOMER_ENDPOINT } from '../../utils/constant';
import { toast } from 'sonner';


export const refershPage = async (dispatch) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_CUSTOMER_ENDPOINT}/get-customer`, { withCredentials: true });
        // console.log(res.data);
        // console.log(res.data.success);
        if (res.data.success) {
            dispatch(setCustomers(res.data.customers));
            toast.success(res.data.message);
        }
    } catch (error) {
        // console.log(error);
        toast.error(error.response.data.message);
    }
}

const CustomerTable = () => {
    const { customers, searchCustomerByText } = useSelector(store => store.customers);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [filterCustomer, setFilterCustomer] = useState(customers);

    useEffect(() => {
        if (!customers) return;
        const filteredCustomer = customers.filter((customer) => {
            if (!searchCustomerByText) {
                return true;
            }
            return customer?.name?.toLowerCase().includes(searchCustomerByText.toLowerCase());
        })
        setFilterCustomer(filteredCustomer);
    }, [customers, searchCustomerByText]);

    const updateCustomerHandler = (id) => {
        // console.log('clicked update customer')
        navigate(`/customer/update-customer/${id}`)
    }

    const deleteCustomerHandler = async (id) => {
        // console.log('clicked delete customer')
        try {
            console.log("refresh clicked")
            const res = await axios.delete(`${import.meta.env.VITE_CUSTOMER_ENDPOINT}/delete-customer/${id}`, { withCredentials: true });
            // console.log(res.data);
            // console.log(res.data.success);
            if (res.data.success) {
                dispatch(deleteCustomer({ _id: id }));
                refershPage(dispatch);
                toast.success(res.data.message);
                alert("Customer Deleted Successfully")
            }
        } catch (error) {
            // console.log(error)
            toast.error(error.response?.data?.message);
        }
    }


    return (
        <div className="overflow-x-auto min-w-60">
            <table class="min-w-full divide-y divide-gray-200 border border-gray-200 shadow-sm">
                <thead class="bg-gray-50">
                    <tr className='text-center'>
                        <th class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">phone</th>
                        <th class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">email</th>
                        <th class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">address</th>
                        <th class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">GSTIN</th>
                        <th class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">Update</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    {filterCustomer?.map((customer) => (
                        <tr key={customer._id} class="hover:bg-gray-50 transition-colors text-center">
                            <td class="px-4 py-2 capitalize whitespace-nowrap text-sm text-gray-700">{customer.name}</td>
                            <td class="px-4 py-2 capitalize whitespace-nowrap text-sm text-gray-700">{customer.phone}</td>
                            <td class="px-4 py-2 capitalize whitespace-nowrap text-sm text-gray-700">{customer.email}</td>
                            <td class="px-4 py-2 capitalize whitespace-nowrap text-sm text-gray-700">{customer.address}</td>
                            {/* <td class="px-4 py-2 capitalize whitespace-nowrap text-sm text-gray-700">{customer.GSTIN}</td> */}
                            <td class="px-4 py-2 capitalize whitespace-nowrap text-sm text-gray-700">
                                {customer.GSTIN && customer.GSTIN.length > 0 ? customer.GSTIN : "-"}
                            </td>
                            <td class="px-4 py-2 capitalize whitespace-nowrap text-sm text-gray-700 flex gap-6 justify-center">
                                <div className="relative">
                                    <Trash size={15} className='cursor-pointer' onClick={() => deleteCustomerHandler(customer._id)} />
                                    <span className="tooltip-text">Delete</span>
                                </div>
                                <div className="relative">
                                    <Pen size={15} className='cursor-pointer' onClick={() => updateCustomerHandler(customer._id)} />
                                    <span className="tooltip-text">Update</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CustomerTable
