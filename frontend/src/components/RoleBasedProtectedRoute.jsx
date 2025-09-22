import { Navigate, Outlet } from 'react-router';
import { useStore } from '../store/store';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import { useUser } from '../hooks/useUser';

const RoleBasedProtectedRoute = ({ allowedRoles, children }) => {
    const {data : user, isLoading , isError } = useUser()


    if(isLoading) return <p>Loading User...</p>

    if(isError || !user) return <Navigate to={'/auth/login'} replace/>

    if(!allowedRoles.includes(user.role)){
      return <Navigate to={'/'}  replace/>
    }


    return children
    
};

export default RoleBasedProtectedRoute