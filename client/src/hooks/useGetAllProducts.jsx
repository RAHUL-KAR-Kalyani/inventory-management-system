import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PRODUCT_ENDPOINT } from "../utils/constant";
import { setProducts } from "../redux/productsSlice";
import { toast } from "sonner";


const useGetAllProducts = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_PRODUCT_ENDPOINT}/get-product`, { withCredentials: true });
                // console.log(res.data);
                // console.log(res.data.success);
                if (res.data.success) {
                    dispatch(setProducts(res.data.products));
                }
            } catch (error) {
                // console.log(error)
                toast.error(error.response?.data?.message);
            }
        }
        fetchProducts();
    }, [])
}

export default useGetAllProducts;