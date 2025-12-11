import axios from 'axios';
import { toast } from 'sonner';
import { Pen, Trash } from 'lucide-react';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, setProducts } from '../../redux/productsSlice';
import { PRODUCT_ENDPOINT } from '../../utils/constant';


export const refershPage = async (dispatch) => {
    try {
        // console.log("refresh clicked")
        const res = await axios.get(`${import.meta.env.VITE_PRODUCT_ENDPOINT}/get-product`, { withCredentials: true });
        // console.log(res.data);
        // console.log(res.data.success);
        if (res.data.success) {
            dispatch(setProducts(res.data.products));
            toast.success(res.data.message);
        }
    } catch (error) {
        // console.log(error)
        toast.error(error.response?.data?.message);
    }
}


const ProductsTable = () => {
    const { products, searchProductByText } = useSelector(store => store.products);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [filterProduct, setFilterProduct] = useState(products);

    useEffect(() => {
        if (!products) return;
        const filteredProducts = products.filter((product) => {
            if (!searchProductByText) {
                return true;
            }
            return product?.name?.toLowerCase().includes(searchProductByText.toLowerCase());
        })
        setFilterProduct(filteredProducts);
    }, [products, searchProductByText]);

    const updateProductHandler = (id) => {
        // console.log('clicked update product')
        navigate(`/product/update-product/${id}`)
    }
    const deleteProductHandler = async (id) => {
        // console.log('clicked delete product')
        try {
            // console.log("delete clicked")
            const res = await axios.delete(`${import.meta.env.VITE_PRODUCT_ENDPOINT}/delete-product/${id}`, { withCredentials: true });
            // console.log(res.data);
            // console.log(res.data.success);
            if (res.data.success) {
                dispatch(deleteProduct({ _id: id }));
                refershPage(dispatch);
                toast.success(res.data.message);
                alert("Product Deleted Successfully")
            }
        } catch (error) {
            // console.log(error, 'error')
            toast.error(error.response?.data?.message);
        }
    }
    return (
        <div className="overflow-x-auto min-w-60">
            <table class="min-w-full divide-y divide-gray-200 border border-gray-200 shadow-sm">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                        <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reorder Level</th>
                        {/* <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Update</th> */}
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    {filterProduct?.map((product) => (
                        <tr key={product._id} class="hover:bg-gray-50 transition-colors">
                            <td class="px-4 py-2 capitalize whitespace-nowrap text-sm text-gray-700">{product.name}</td>
                            <td class="px-4 py-2 capitalize whitespace-nowrap text-sm text-gray-700">{product.sku}</td>
                            <td class="px-4 py-2 capitalize whitespace-nowrap text-sm text-gray-700">{product.category}</td>
                            <td class="px-4 py-2 capitalize whitespace-nowrap text-sm text-gray-700">{product.price}</td>
                            <td class="px-4 py-2 capitalize whitespace-nowrap text-sm text-gray-700">{product.stock}</td>
                            <td class="px-4 py-2 capitalize whitespace-nowrap text-sm text-gray-700">{product.reorderLevel}</td>
                            <td class="px-4 py-2 capitalize whitespace-nowrap text-sm text-gray-700 flex gap-6">
                                <div className="relative">
                                    <Trash size={15} className='cursor-pointer' onClick={() => deleteProductHandler(product._id)} />
                                    <span className="tooltip-text">Delete</span>
                                </div>
                                <div className="relative">
                                    <Pen size={15} className='cursor-pointer' onClick={() => updateProductHandler(product._id)} />
                                    <span className="tooltip-text">Update</span>
                                </div>
                                {/* <Pen size={15} className='cursor-pointer' onClick={() => updateProductHandler(product._id)} /> */}

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default ProductsTable
