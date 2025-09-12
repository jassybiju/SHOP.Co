import { Navigate } from 'react-router';
import { useStore } from '../store/store';
import { useFetchUser } from '../app/Auth/hooks/useAuth';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';

const RoleBasedProtectedRoute = ({ allowedRoles, children }) => {
    const {data , isLoading } = useFetchUser()
    const {user, setUser} = useStore()
    useEffect(()=>{
        //!TODO
        if(data){
            setUser(data)
        }
        console.log(data)
    },[data, setUser])
    
    if(isLoading || !user){
        return <Loader/>
    }
    //TODO( resolve : //~~Error) after logged in going to /admin redirects to home because !user is getting true becuase of not getting the user and redirectig to /auth/login from there because of protected routed going to /home
    console.log(user)
 

  if (!allowedRoles.includes(user.role)) {
    console.log(user.role)
    return <Navigate to="/unauthorised" replace />;
  }

  return children;
};

export default RoleBasedProtectedRoute