import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useState } from "react";

const MainLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };

    return (
        <div>
            <Navbar toggleSidebar={toggleSidebar} />
            <div className="flex">
                <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
                <div className="md:ml-[20%] transition-all pt-16 w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
