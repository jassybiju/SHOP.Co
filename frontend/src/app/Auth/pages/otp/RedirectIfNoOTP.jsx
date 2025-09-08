import { useEffect } from "react";
import { Outlet, redirect, useLocation, useNavigate } from "react-router";

const RedirectIfNoOTP = ({children}) => {
    const {state} = useLocation()
    const navigate = useNavigate()
    useEffect(()=>{
        if(!state){
            navigate('auth/register', {replace : true})
        }
    },[navigate, state, children])
  
    return children
  
};
export default RedirectIfNoOTP;
