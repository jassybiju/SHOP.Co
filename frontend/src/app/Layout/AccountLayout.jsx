import React, { useState } from "react";
import { Outlet } from "react-router";
import Footer from "../Home/components/Footer";
import Navbar from "../Home/components/Navbar";
import Sidebar from "../User/Accounts/components/Sidebar";
import { useResponsive } from "@/hooks/useResponsive";
import { Menu } from "lucide-react";

const AccountLayout = () => {
    const [open, setOpen] = useState(false)
    const {isTab} = useResponsive()
	return (
		<>
			<Navbar />
            {isTab && !open && (<> <Menu onClick={()=>setOpen(prev => !prev)} className="ms-2"/> </>)}
			<div className="flex   ">
				{(!isTab || open) && <Sidebar open={isTab && open} close={()=>setOpen(x => !x)} />}

				<div className={`w-full lg:w-3/5  mx-auto shadow-xl ring ring-gray-200 rounded-xl md:my-20 px-2 py-4 md:px-10  md:py-10 ${(isTab && open)? 'absolute': ''}`}>
					<Outlet />
				</div>
			</div>
			<Footer />
		</>
	);
};
export default AccountLayout;
