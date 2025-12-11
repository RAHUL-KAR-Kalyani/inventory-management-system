import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CUSTOMER_ENDPOINT } from "../utils/constant";
import { setCustomers } from "../redux/customersSlice";
import { toast } from "sonner";


const useGetAllCustmers = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchCustmers = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_CUSTOMER_ENDPOINT}/get-customer`, { withCredentials: true });
                // console.log(res.data);
                // console.log(res.data.success);
                if (res.data.success) {
                    // console.log("data found")
                    dispatch(setCustomers(res.data.customers));
                }
                // console.log("no data found")
            } catch (error) {
                // console.log(error);
                toast.error(error.response?.data?.message);
            }
        }
        fetchCustmers();
    }, [])
}

export default useGetAllCustmers;