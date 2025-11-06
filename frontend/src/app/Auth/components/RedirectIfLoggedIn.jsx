import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";

const RedirectIfLoggedIn = () => {
  const { data : user, isLoading, status } = useUser();
  console.log(user, isLoading, status)
  if (isLoading) {
    return <div>Loading...</div>; // or your loader
  }

  if (user) {
    // If the user is logged in, redirect to their dashboard
    return <Navigate to="/" replace />;
  }

  // If not logged in, render the nested routes (login/register)
  return <Outlet />;
};

export default RedirectIfLoggedIn;
