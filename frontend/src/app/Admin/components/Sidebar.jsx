import {
  CircleUserRound,
  LogOut,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router";
import { useLogoutUser } from "../../Auth/hooks/useAuth";
import { useUser } from "../../../hooks/useUser";
import useConfirmationModal from "../hooks/useConfirmationModal";

const Sidebar = ({ navList = [], isOpen, setIsOpen }) => {
  const { data: user } = useUser();
  const { mutate: logout } = useLogoutUser();
  const confirmation = useConfirmationModal()
  return (  
    <>
      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-64 bg-white shadow-md flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0 z-[100]" : "-translate-x-full"}
           md:translate-x-0 md:w-1/4
        `}
      >
        {/* Logo */}
        <div className="p-4 text-xl font-bold border-b border-gray-200">
          <h1 className="font-bakbak text-3xl md:text-5xl text-black">SHOP.CO</h1>
          <p className="text-gray-600 text-sm">Admin Dashboard</p>
        </div>

        {/* Nav links */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {navList.map((x, i) => (
              <li key={i}>
                <NavLink
                  end
                  to={x.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg text-lg transition-colors
                     hover:bg-gray-200 hover:text-gray-900
                     ${
                       isActive
                         ? "bg-violet-700 text-white hover:bg-violet-600"
                         : "text-gray-700"
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

        {/* User section */}
        <div className="p-4 border-t border-gray-200 flex items-center gap-3">
          <CircleUserRound size={40} className="text-gray-600" />
          <div className="flex-1">
            <h2 className="text-base font-medium uppercase">
              {user?.first_name || "User"}
            </h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
          <button onClick={()=>confirmation(logout)} className="text-gray-600 hover:text-red-600">
            <LogOut size={20} />
          </button>
        </div>
      </div>

      {/* Overlay for small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
