import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateCustomer } from "../../redux/customersSlice";
import { toast } from "sonner";
import { CUSTOMER_ENDPOINT } from "../../utils/constant";

const UpdateCustomer = () => {
    useEffect(() => {
        document.title = "Update Customer";
    }, []);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { customers } = useSelector((state) => state.customers);
    const [input, setInput] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        GSTIN: ""
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const customer = customers.find((c) => c._id === id);
        if (customer) {
            setInput({
                name: customer.name,
                phone: customer.phone,
                email: customer.email,
                address: customer.address,
                GSTIN: customer.GSTIN
            });
        }
    }, [id, customers]);

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_CUSTOMER_ENDPOINT}/update-customer/${id}`,
                input,
                {
                    withCredentials: true,
                }
            );
            // console.log(response.data);
            // console.log(response.data.success);
            if (response.data.success) {
                dispatch(updateCustomer(response.data.customer));
                setMessage("customer updated successfully!");
                navigate("/customers")
                toast.success(response.data.message);
            }
        } catch (error) {
            // console.log(error);
            toast.error(error.response?.data?.message);
            setMessage("Failed to update customer.");
        }
        setLoading(false);
    };


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={submitHandler} className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96" >
                <h2 className="text-xl font-semibold mb-4 text-center">Update Product</h2>
                {message && (
                    <p className="text-center text-green-600 mb-3">{message}</p>
                )}

                <input type="text" name="name" value={input.name} onChange={changeEventHandler} placeholder="customer Name" className="w-full p-1.5 border rounded-md mb-3" />
                <input type="text" name="phone" value={input.phone} onChange={changeEventHandler} placeholder="phone" className="w-full p-1.5 border rounded-md mb-3" />
                <input type="text" name="email" value={input.email} onChange={changeEventHandler} placeholder="email" className="w-full p-1.5 border rounded-md mb-3" />
                <input type="text" name="address" value={input.address} onChange={changeEventHandler} placeholder="address" className="w-full p-1.5 border rounded-md mb-3" />
                <input type="text" name="GSTIN" value={input.GSTIN} onChange={changeEventHandler} placeholder="GSTIN" className="w-full p-1.5 border rounded-md mb-3" />

                <button type="submit" disabled={loading} className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600" >
                    {loading ? "Updating..." : "Update customer"}
                </button>
            </form>
        </div>
    )
}

export default UpdateCustomer