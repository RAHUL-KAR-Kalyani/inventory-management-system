import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addCustomer } from '../../redux/customersSlice';
import { toast } from 'sonner';
import { CUSTOMER_ENDPOINT } from '../../utils/constant';
import { useNavigate } from 'react-router-dom';

const AddCustomer = () => {
    useEffect(() => {
        document.title = "Add Customer";
    }, []);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [input, setInput] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        GSTIN: ""
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await axios.post(`${import.meta.env.VITE_CUSTOMER_ENDPOINT}/add-customer`, input,
                {
                    withCredentials: true,
                }
            );
            // console.log(response.data);
            // console.log(response.data.success);

            if (response.data.success) {
                dispatch(addCustomer(response.data.customer));
                setMessage("customer added successfully!");
                toast.success(response.data.message);
                setInput({
                    name: "",
                    phone: "",
                    email: "",
                    address: "",
                    GSTIN: ""
                });
                navigate('/invoice/add-invoice')
            }

        } catch (error) {
            // console.log(error);
            toast.error(error.response?.data?.message);
            setMessage("Failed to add customer. Try again.");
        }
        setLoading(false);
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={submitHandler} className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96" >
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    Add Customer
                </h2>

                {message && (
                    <p className="text-center mb-3 text-green-600 font-medium">
                        {message}
                    </p>
                )}

                <div className="my-2">
                    <input type="text" name="name" value={input.name} onChange={changeEventHandler} placeholder="customer Name" className="w-full p-3 border border-gray-300 rounded-md" required />
                </div>

                <div className="my-2">
                    <input type="text" name="phone" value={input.phone} onChange={changeEventHandler} placeholder="phone" className="w-full p-3 border border-gray-300 rounded-md" required />
                </div>

                <div className="my-2">
                    <input type="text" name="email" value={input.email} onChange={changeEventHandler} placeholder="email" className="w-full p-3 border border-gray-300 rounded-md" required />
                </div>

                <div className="my-2">
                    <input type="text" name="address" value={input.address} onChange={changeEventHandler} placeholder="address" className="w-full p-3 border border-gray-300 rounded-md" />
                </div>

                <div className="my-2">
                    <input type="text" name="GSTIN" value={input.GSTIN} onChange={changeEventHandler} placeholder="GSTIN (Optional)" className="w-full p-3 border border-gray-300 rounded-md" />
                </div>

                <div className="mt-6">
                    <button type="submit" disabled={loading} className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600" >
                        {loading ? "Please wait..." : "Add Customer"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddCustomer
