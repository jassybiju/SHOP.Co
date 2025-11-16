import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

const RedirectIfNotLoggedIn = () => {
  const { data : user, isLoading,  } = useUser();
  if (isLoading) {
    return <Loader/>
  }

  if (!user) {
    // If the user is logged in, redirect to their dashboard
    return <Navigate to="/auth/login" replace />;
  }
  if(!user.active){
    toast.error("User Blocked")
    return <Navigate to="/auth/login" replace />;
  }

  // If not logged in, render the nested routes (login/register)
  return <Outlet />
};

export default RedirectIfNotLoggedIn;
