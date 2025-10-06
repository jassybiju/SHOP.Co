import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../hooks/useUser"; // Your custom hook to get user
import toast from "react-hot-toast";

const RoleBasedProtectedRoute = ({ allowedRoles = [] }) => {
  const { data : user, isLoading ,status} = useUser({});
  const location = useLocation();
    console.log(user , isLoading, status)
  if (isLoading) return <div>Loading...</div>; // Or a spinner

  // Not logged in
  if (!user) return <Navigate to="/auth/login" replace state={{ from: location }} />;

// Blocked user
  if (!user.active) {
    toast.error("Blocked User")
    return <Navigate to="/auth/login" replace />;}

  // Role not allowed
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" replace />;

  // Allowed — render nested routes
  return <Outlet />;
};

export default RoleBasedProtectedRoute;
