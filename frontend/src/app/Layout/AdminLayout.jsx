import { Outlet } from "react-router";
import Sidebar from "../Admin/components/Sidebar";
import {
    LayoutDashboard,
    Package,
    Shirt,
    ShoppingBag,
    User,
} from "lucide-react";
import Header from "../Admin/components/Header";
import ShowModal from "./ShowModal";
import { ModalProvider } from "../Admin/hooks/ModalContext";



const AdminLayout = () => {

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
        },
    ];
    return (
      <ModalProvider>
        <div className="flex min-h-screen">
            <ShowModal/>
            {/* Sidebar */}
            <Sidebar navList={navList} />

            {/* Main content area */}
            <main className="flex-1 bg-gray-100 ">
                <Outlet  />
            </main>
        </div>

      </ModalProvider>
    );
};

export default AdminLayout;
