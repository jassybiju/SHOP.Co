import { useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import BreadCrumb from "@/app/Home/components/BreadCrumb";
import AvatarImageComponent from "../pages/profile/components/AvatarImageComponent";
import { useUser } from "@/hooks/useUser";

const Sidebar = () => {
  const { data: user } = useUser();
  const location = useLocation();
  const [selected, setSelected] = useState("Manage My Account");

  const isActive = useCallback(
    (path) => location.pathname === `/account/${path}`,
    [location.pathname]
  );

  const isParentActive = (children) =>
    children?.some((child) => isActive(child.path));

  const navItems = [
    {
      label: "Manage My Account",
      children: [
        { label: "My Profile", path: "" },
        { label: "Address Book", path: "address" },
        { label: "Change Password", path: "edit/change-password" },
      ],
    },
    { label: "My Orders", path: "orders" },
    // { label: "My Wishlist", path: "wishlist" },
    { label: "My Coupons", path: "coupon" },
    { label: "Wallet", path: "wallet" },
  ];

  return (
    <div className="w-1/4 min-w-[220px] bg-white shadow-md rounded-xl p-5">
      {/* Breadcrumb */}
      <BreadCrumb  />

      {/* Avatar */}
      <div className="flex w-40 mx-auto flex-col items-center my-10">
        <div className="h-40 w-40">
        <AvatarImageComponent readonly previewImg={user?.avatar_url} size={99}  />
        </div>
        <p className="text-lg font-semibold mt-4">
          {user?.first_name} {user?.last_name}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex flex-col gap-3">
        {navItems.map((item) => (
          <div key={item.label}>
            {/* Parent link or group */}
            {item.path ? (
              <Link
                to={`/account/${item.path}`}
                onClick={() => setSelected(item.label)}
                className={`block px-4 py-2 rounded-lg font-medium transition-all duration-300
                  ${
                    isActive(item.path)
                      ? "bg-gray-200 text-gray-900"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
              >
                {item.label}
              </Link>
            ) : (
              <button
                onClick={() =>
                  setSelected((prev) =>
                    prev === item.label ? "" : item.label
                  )
                }
                className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all duration-300 flex justify-between items-center
                  ${
                    isParentActive(item.children)
                      ? "bg-gray-200 text-gray-900"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
              >
                {item.label}
                <span
                  className={`transform transition-transform duration-300 ${
                    selected === item.label ? "rotate-90" : ""
                  }`}
                >
                  ▶
                </span>
              </button>
            )}

            {/* Submenu */}
            {item.children && (
              <div
                className={`flex flex-col pl-6 mt-1 overflow-hidden transition-all duration-500 ease-in-out ${
                  selected === item.label ? "max-h-40" : "max-h-0"
                }`}
              >
                {item.children.map((child) => (
                  <Link
                    key={child.label}
                    to={`/account/${child.path}`}
                    onClick={() => setSelected(item.label)}
                    className={`px-3 py-2 rounded-md text-sm transition-colors duration-300
                      ${
                        isActive(child.path)
                          ? "bg-gray-200 text-gray-900"
                          : "hover:bg-gray-100 text-gray-600"
                      }`}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
