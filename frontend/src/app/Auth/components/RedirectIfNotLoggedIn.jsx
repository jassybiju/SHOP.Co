import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "lucide-react";
import { useUser } from "../../../hooks/useUser";
import { useStore } from "../../../store/store";
import toast from "react-hot-toast";

const RedirectIfNotLoggedIn = () => {
  const { data : user, isLoading,  } = useUser();
  if (isLoading) {
    return <div>Loading...</div>; // or your loader
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
