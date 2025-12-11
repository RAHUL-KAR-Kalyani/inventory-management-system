import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { DASHBOARD_ENDPOINT } from "../utils/constant";
import { toast } from "sonner";
import { setDashboard } from "../redux/dashboardSlice";

const useGetDashboard = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_DASHBOARD_ENDPOINT}`, { withCredentials: true });
                // console.log(res.data);
                // console.log(res.data.success)
                if (res.data.success) {
                    // console.log("data found")
                    dispatch(setDashboard(res.data.dashboard));
                    // toast.success(res.data.message);
                }

            } catch (error) {
                // console.log(error);
                toast.error(error.response?.data?.message);
            }
        };
        fetchDashboard();
    }, []);

}

export default useGetDashboard;