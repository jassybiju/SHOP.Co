import { Outlet, useRouteError } from "react-router";
import Navbar from "../Home/components/Navbar";


const AppLayout = () => {
  const error = useRouteError()
  console.log(error)
  return <>
    <Navbar/>
    <Outlet/>

  </>
};
export default AppLayout;
