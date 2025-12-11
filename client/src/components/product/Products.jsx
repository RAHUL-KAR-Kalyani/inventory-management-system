import { useEffect, useState } from 'react'
import { RefreshCcw } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProductsTable, { refershPage } from './ProductsTable';
import useGetAllProducts from '../../hooks/useGetAllProducts'
import { setSearchProductByText } from '../../redux/productsSlice';

const Products = () => {
    useEffect(() => {
        document.title = "Products";
    }, []);
    useGetAllProducts();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setSearchProductByText(input));
    }, [input]);
    return (
        <div className='min-w-60'>
            <div className='flex flex-col gap-6'>
                <div className='flex items-center gap-3'>
                    <input type="text" className='p-2 outline-none' placeholder='Search products' onChange={(e) => setInput(e.target.value)} />
                    <button onClick={() => navigate('/product/add-product')} className='bg-gray-700 text-white text-center p-2'>add new products</button>
                    
                    <button onClick={() => refershPage(dispatch)} className="flex items-center bg-gray-700 text-white text-center p-2">
                        <RefreshCcw size={20} className='pe-1'/>
                        Refresh
                    </button>
                </div>
                <ProductsTable />
            </div>
        </div>
    )
}

export default Products