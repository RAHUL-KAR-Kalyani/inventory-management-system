import axios from 'axios';
import { toast } from 'sonner';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/productsSlice';
import { PRODUCT_ENDPOINT } from '../../utils/constant';

const AddProduct = () => {
    useEffect(() => {
        document.title = "Add Product";
    }, []);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        name: "",
        sku: "",
        category: "",
        price: "",
        stock: "",
        reorderLevel: "",
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
            const response = await axios.post(`${import.meta.env.VITE_PRODUCT_ENDPOINT}/add-product`, input,
                {
                    withCredentials: true,
                }
            );
            console.log(response.data);
            console.log(response.data.success,"success");

            if (response.data.success) {
                dispatch(addProduct(response.data.product));
                setMessage("Product added successfully!");
                toast.success(response.data.message);
                setInput({
                    name: "",
                    sku: "",
                    category: "",
                    price: "",
                    stock: "",
                    reorderLevel: "",
                });
            }


        } catch (error) {
            console.log(error);
            setMessage("Failed to add product. Try again.");
            toast.error(error.response?.data?.message);

        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={submitHandler} className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96" >
                <h2 className="text-2xl font-semibold mb-4 text-center">
                    Add Product
                </h2>

                {message && (
                    <p className="text-center mb-3 text-green-600 font-medium">
                        {message}
                    </p>
                )}

                <div className="my-2">
                    <input type="text" name="name" value={input.name} onChange={changeEventHandler} placeholder="Product Name" className="w-full p-3 border border-gray-300 rounded-md" required />
                </div>

                <div className="my-2">
                    <input type="text" name="sku" value={input.sku} onChange={changeEventHandler} placeholder="Product SKU" className="w-full p-3 border border-gray-300 rounded-md" required />
                </div>

                <div className="my-2">
                    <input type="text" name="category" value={input.category} onChange={changeEventHandler} placeholder="Category" className="w-full p-3 border border-gray-300 rounded-md" required />
                </div>

                <div className="my-2">
                    <input type="number" name="price" value={input.price} onChange={changeEventHandler} placeholder="Price" className="w-full p-3 border border-gray-300 rounded-md" required />
                </div>

                <div className="my-2">
                    <input type="number" name="stock" value={input.stock} onChange={changeEventHandler} placeholder="In Stock" className="w-full p-3 border border-gray-300 rounded-md" required />
                </div>

                <div className="my-2">
                    <input type="number" name="reorderLevel" value={input.reorderLevel} onChange={changeEventHandler} placeholder="Reorder Level" className="w-full p-3 border border-gray-300 rounded-md" required />
                </div>

                <div className="mt-6">
                    <button type="submit" disabled={loading} className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600" >
                        {loading ? "Please wait..." : "Add Product"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
