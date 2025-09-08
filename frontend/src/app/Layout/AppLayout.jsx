import { Outlet } from "react-router";
import Navbar from "../../components/Navbar";

const AppLayout = () => {
  return <>
    <Navbar/>
    <Outlet/>

  </>
};
export default AppLayout;
