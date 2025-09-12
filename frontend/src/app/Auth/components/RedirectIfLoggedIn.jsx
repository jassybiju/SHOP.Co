import { Navigate, Outlet } from "react-router";
import { useStore } from "../../../store/store";
import { Loader } from "lucide-react";
import { useLoginUser } from "../hooks/useAuth";

const RedirectIfLoggedIn = () => {
    const {user} = useStore()
    const {isPending} = useLoginUser()
    console.log(123)  
    // if user is logging it would stop protection 
    if( isPending){
      return <Loader/>
    }
    if(!user ){
      return   <Outlet/>
    }else{
        return <Navigate to='/admin' replace/>
    }

  
};
export default RedirectIfLoggedIn;
