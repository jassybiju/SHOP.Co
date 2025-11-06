import React from "react";
import { useUser } from "@/hooks/useUser";
import SearchProduct from "./SearchProduct";
import { Heart, ShoppingCart, User } from "lucide-react";
import ProfileDropdown from "../../../components/ProfileDropdown";
import { Link, useNavigate } from "react-router";
import useConfirmationModal from "@/app/Admin/hooks/useConfirmationModal";
import { useLogoutUser } from "@/app/Auth/hooks/useAuth";
import Search from "@/app/Admin/components/Search";

const NavbarIcons = () => {
	const navigate = useNavigate();
	const confirmation = useConfirmationModal();
	const { mutate: logout } = useLogoutUser();
	const { data: user } = useUser();
	let dropdownitems = [
		{ label: "Account", onClick: () => navigate("/account") },
		{ label: "Logout", onClick: () => confirmation(logout) },
	];

	if (user?.role === "admin") {
		dropdownitems.push({
			label: "Admin",
			onClick: () => navigate("/admin"),
		});
	}
	return (
		<div className="flex items-center space-x-4">
			<SearchProduct />
			{user ? (
				<div className="flex items-center space-x-3">
					<Link className="relative cursor-pointer" to="/cart">
						<ShoppingCart className="w-6 h-6" />
						<div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"></div>
					</Link>
					<Link className="relative cursor-pointer" to="/wishlist">
						{/* <ShoppingCart className="w-6 h-6" /> */}
						<Heart className="w-6 h-6 cursor-pointer" />
						{/* <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"></div> */}
					</Link>

					<ProfileDropdown label={<User className="w-6 h-6 cursor-pointer" />} items={dropdownitems} />
				</div>
			) : (
				<div>
					<Link to={"/auth/login"} className="bg-black text-white px-10 py-2 rounded-full hover:bg-black/90">
						Login
					</Link>
				</div>
			)}
		</div>
	);
};
export default NavbarIcons;
