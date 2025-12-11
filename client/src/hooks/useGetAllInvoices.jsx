import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { INVOICE_ENDPOINT } from "../utils/constant";
import { setInvoices } from "../redux/invoicesSlice";


const useGetAllInvoices = () => {
    const dispatch = useDispatch();
    // console.log("all invoices are: ")
    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_INVOICE_ENDPOINT}/get-invoice`, { withCredentials: true });
                // console.log(res.data);
                // console.log(res.data.success, 'success');
                if (res.data.success) {
                    // console.log("Data found, dispatching...");
                    dispatch(setInvoices(res.data.invoices));
                }
                // console.log("Success was false or no data found");

            } catch (error) {
                console.log(error)
            }
        }
        fetchInvoices();
    }, [])
}

export default useGetAllInvoices;