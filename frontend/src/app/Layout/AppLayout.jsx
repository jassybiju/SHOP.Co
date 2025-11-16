import { Outlet, useRouteError } from "react-router";
import Navbar from "../Home/components/Navbar";
import Footer from "../Home/components/Footer";

const AppLayout = () => {
	const error = useRouteError();
	console.log(error);
	return (
		<>
			<Navbar />
            <div className="min-h-screen">
			<Outlet />
            </div>
			<Footer />
		</>
	);
};
export default AppLayout;
