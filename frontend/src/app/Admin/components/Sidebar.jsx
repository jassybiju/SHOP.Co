import { CircleUserIcon, CircleUserRound, LayoutDashboard, LogOut } from "lucide-react";
import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { useStore } from "../../../store/store";
import { useLogoutUser } from "../../Auth/hooks/useAuth";
import { useUser } from "../../../hooks/useUser";

const Sidebar = ({ navList = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    // const [name , email ] = [user.first_name + " " +user.last_name , user.email]
    const {data : user} = useUser()
    const {mutate : logout}  = useLogoutUser()

    console.log(user)
    return (
        <>
            {/* Toggle button for small screens */}
            <button
                className="md:hidden h-10 p-2 m-2 text-gray-700 border rounded-md"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle sidebar"
            >
                ☰
            </button>

            {/* Sidebar */}
            <div
                className={`
                    flex
                    flex-col
          fixed top-0 left-0 h-screen bg-white-800 text-black w-3/4 md:w-1/4 max-w-80 min-w-60
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0 z-100" : "-translate-x-full"} 
          md:translate-x-0 md:static md:flex-shrink-0
        `}
            >
                <div className="p-4 text-xl font-bold border-b border-gray-200">
                    <div className="">
                        <h1 className="font-bakbak   text-3xl md:text-5xl font-normal text-black">
                            SHOP.CO
                        </h1>
                        <p className="font-normal text-gray-800">
                            Admin Dashboard
                        </p>
                    </div>
                </div>
                <nav className="p-4">
                    <ul className="space-y-4">
                        {navList.map((x) => (
                            <li>
                                <NavLink
                                    end
                                    to={x.path}
                                    className={({ isActive }) =>
                                        `hover:text-gray-700 hover:bg-gray-300 flex p-4 rounded-xl  gap-4 text-xl items-center   ${
                                            isActive &&
                                            "bg-violet-700 hover:bg-violet-600 text-white hover:text-white/90"
                                        }`
                                    }
                                    onClick={() => setIsOpen(false)}
                                >
                                    {x.icon} {x.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className=" h-20  self-baseline mt-auto flex gap-5 mx-auto items-center ">
                    <CircleUserRound size={40} />
                    <div>
                        <h2 className="text-xl uppercase ">{user.first_name}</h2>
                        <p className="text-sm">{user.email}</p>
                    </div>
                    <LogOut size={20} className="" onClick={logout}/>
                </div>
            </div>

            {/* Overlay for small screen when sidebar is open */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-50 md:hidden"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                ></div>
            )}
        </>
    );
};

export default Sidebar;
