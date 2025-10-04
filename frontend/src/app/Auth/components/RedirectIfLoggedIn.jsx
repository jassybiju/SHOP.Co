import { Navigate, Outlet } from "react-router";
import { useStore } from "../../../store/store";
import { useLoginUser } from "../hooks/useAuth";
import { useUser } from "../../../hooks/useUser";
import Loader from "../../../components/Loader";

const RedirectIfLoggedIn = () => {
    const {data , isLoading} = useUser()
    const {isPending} = useLoginUser()
    console.log(data)  

    // if(isLoading){
    //   return <Loader/>
    // }
    // if user is logging it would stop protection 
    if( isPending){
      return <Loader/>
    }
    if(!data ){
      return   <Outlet/>
    }else{
        return <Navigate to='/admin' replace/>
    }

  
};
export default RedirectIfLoggedIn;
