import { Outlet } from "react-router";
import Footer from "../Home/components/Footer";
import Navbar from "../Home/components/Navbar";
import Sidebar from "../User/Accounts/components/Sidebar";

const AccountLayout = () => {
  return <>
    <Navbar/>
    <div className="flex px-10 py-20">
    <Sidebar/>
    <Outlet/>
    </div>
    <Footer/>
  </>;
};
export default AccountLayout;
