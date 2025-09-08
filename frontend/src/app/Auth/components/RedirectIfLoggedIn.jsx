import { Navigate, Outlet, redirect, useNavigate } from "react-router";
import { useStore } from "../../../store/store";

const RedirectIfLoggedIn = () => {
    const {user} = useStore()
    console.log(user)
    if(!user){
      return   <Outlet/>
    }else{
        return <Navigate to='/home' replace/>
    }

  
};
export default RedirectIfLoggedIn;
