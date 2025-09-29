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
import { useState } from "react";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navList = [
    { label: "Dashboard", icon: <LayoutDashboard />, path: "/admin/" },
    { label: "User Management", icon: <User />, path: "/admin/user-management/" },
    { label: "Product Management", icon: <Package />, path: "/admin/product-management/" },
    { label: "Brand Management", icon: <ShoppingBag />, path: "/admin/brand-management/" },
    { label: "Category Management", icon: <Shirt />, path: "/admin/category-management/" },
  ];

  return (
    <ModalProvider>
      <div className="flex min-h-screen">
        <ShowModal />

        {/* Sidebar */}
        <Sidebar navList={navList} isOpen={isOpen} setIsOpen={setIsOpen} />

        {/* Main content area */}
        <main className="flex-1 bg-gray-100 pl-96 min-h-screen">
         

            <Outlet context={{isOpen , setIsOpen}} />

        </main>
      </div>
    </ModalProvider>
  );
};

export default AdminLayout;
