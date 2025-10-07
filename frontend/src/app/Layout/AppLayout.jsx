import { Outlet, useRouteError } from "react-router";
import Navbar from "../Home/components/Navbar";
import Footer from "../Home/components/Footer";
import NewsLetter from "../Home/components/NewsLetter";


const AppLayout = () => {
  const error = useRouteError()
  console.log(error)
  return <>
    <Navbar/>
    <Outlet/>
    <Footer/>
  </>
};
export default AppLayout;
