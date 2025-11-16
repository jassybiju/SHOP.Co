import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import Loader from "@/components/Loader";

const RedirectIfLoggedIn = () => {
  const { data : user, isLoading, status } = useUser();
  console.log(user, isLoading, status)
  if (isLoading) {
    return <Loader/>
  }

  if (user) {
    // If the user is logged in, redirect to their dashboard
    return <Navigate to="/" replace />;
  }

  // If not logged in, render the nested routes (login/register)
  return <Outlet />;
};

export default RedirectIfLoggedIn;
