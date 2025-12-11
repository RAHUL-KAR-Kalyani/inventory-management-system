import axios from "axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateProduct } from "../../redux/productsSlice";
import { PRODUCT_ENDPOINT } from "../../utils/constant";

const UpdateProduct = () => {
    useEffect(() => {
        document.title = "Update Product";
    }, []);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);
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

    useEffect(() => {
        const product = products.find((p) => p._id === id);
        if (product) {
            setInput({
                name: product.name,
                sku: product.sku,
                category: product.category,
                price: product.price,
                stock: product.stock,
                reorderLevel: product.reorderLevel,
            });
        }
    }, [id, products]);

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
                `${import.meta.env.VITE_PRODUCT_ENDPOINT}/update-product/${id}`,
                input,
                {
                    withCredentials: true, // send cookies
                }
            );
            console.log(response.data);
            console.log(response.data.success);
            if (response.data.success) {
                dispatch(updateProduct(response.data.product));
            }
            setMessage("Product updated successfully!");
            navigate("/products")
            toast.success(response.data.message);
        } catch (error) {
            console.log(error);
            setMessage("Failed to update product.");
            toast.error(error.response?.data?.message);
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

                <input type="text" name="name" value={input.name} onChange={changeEventHandler} placeholder="Product Name" className="w-full p-1.5 border rounded-md mb-3" required />
                <input type="text" name="sku" value={input.sku} onChange={changeEventHandler} placeholder="Product SKU" className="w-full p-1.5 border rounded-md mb-3" required />
                <input type="text" name="category" value={input.category} onChange={changeEventHandler} placeholder="Category" className="w-full p-1.5 border rounded-md mb-3" required />
                <input type="number" name="price" value={input.price} onChange={changeEventHandler} placeholder="Price" className="w-full p-1.5 border rounded-md mb-3" required />
                <input type="number" name="stock" value={input.stock} onChange={changeEventHandler} placeholder="In Stock" className="w-full p-1.5 border rounded-md mb-3" required />
                <input type="number" name="reorderLevel" value={input.reorderLevel} onChange={changeEventHandler} placeholder="Reorder Level" className="w-full p-1.5 border rounded-md mb-4" required />

                <button type="submit" disabled={loading} className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600" >
                    {loading ? "Updating..." : "Update Product"}
                </button>
            </form>
        </div>
    );
};

export default UpdateProduct;
