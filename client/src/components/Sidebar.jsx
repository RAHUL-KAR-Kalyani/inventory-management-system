import React from 'react'
import { useState } from "react";
import { Home, Receipt, Package, Users, ShoppingCart, BarChart3, Settings, Menu, X, ChartSpline } from "lucide-react";
import { Link } from 'react-router-dom';

const Sidebar = ({ open, setOpen }) => {
    const menuItems = [
        { name: "Dashboard", path: "/" },
        { name: "Products", path: "/products" },
        { name: "Customers", path: "/customers" },
        { name: "Invoice", path: "/invoices" },
        // { name: "Sale", path: "/sale" }
    ];

    return (
        <div>
            <div className={`bg-gray-900 sidebar-z-index text-white h-screen fixed top-0 left-0 p-5 pt-16 w-[18%] transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
                <nav className="space-y-3">
                    {menuItems.map((item) => (
                        <Link to={item.path} key={item.name} className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-700 transition" onClick={() => setOpen(false)} >
                            {item.icon}
                            <span className="text-sm font-medium">{item.name}</span>
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
