import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "lucide-react";
import { useUser } from "../../../hooks/useUser";
import { useStore } from "../../../store/store";

const RedirectIfNotLoggedIn = ({ children }) => {
  const { user, setUser, clearUser } = useStore();
  const { data, isLoading, isError } = useUser({
    staleTime: 0,
    cacheTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: 1,
  });

  // Update store only if user exists and is valid
  if (data && !data.is_blocked && !data.is_deleted && !user) {
    setUser(data);
  }

  // Clear store if fetch failed or user is blocked/deleted
  if ((isError || (data && (data.is_blocked || data.is_deleted))) && user) {
    clearUser();
  }

  if (isLoading) return <Loader />;

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return children || <Outlet />;
};

export default RedirectIfNotLoggedIn;
