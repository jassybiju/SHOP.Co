import { Outlet } from "react-router";
import Sidebar from "../Admin/components/Sidebar";
import {
    LayoutDashboard,
    Package,
    PackageXIcon,
    Shirt,
    ShoppingBag,
    User,
} from "lucide-react";
import Header from "../Admin/components/Header";
// import ShowModal from "./ShowModal";
import { ModalProvider } from "../../components/ModalProvider";
import { useState } from "react";

const AdminLayout = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navList = [
        { label: "Dashboard", icon: <LayoutDashboard />, path: "/admin/" },
        {
            label: "User Management",
            icon: <User />,
            path: "/admin/user-management/",
        },
        {
            label: "Product Management",
            icon: <Package />,
            path: "/admin/product-management/",
        },
        {
            label: "Brand Management",
            icon: <ShoppingBag />,
            path: "/admin/brand-management/",
        },
        {
            label: "Category Management",
            icon: <Shirt />,
            path: "/admin/category-management/",
        },{
            label: "Order Management",
            icon: <PackageXIcon />,
            path: "/admin/order-management/",
        },{
            label: "Stock Management",
            icon: <PackageXIcon />,
            path: "/admin/stock-management/",
        },{
            label: "Coupon Management",
            icon: <PackageXIcon />,
            path: "/admin/coupon-management/",
        },{
            label: "Sales Report Management",
            icon: <PackageXIcon />,
            path: "/admin/sales-report/",
        },
    ];

    return (

            <div className="flex min-h-screen">
                {/* <ShowModal /> */}

                {/* Sidebar */}
                <Sidebar
                    navList={navList}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />

                {/* Main content area */}
                <main className={`flex-1 bg-gray-100  min-h-screen ${isOpen ? 'translate-x-0 z-[100]' : '-translate-x-0'} md:translate-x-0 md:w-1/4`}>
                    <Outlet context={{ isOpen, setIsOpen }} />
                </main>
            </div>

    );
};

export default AdminLayout;
