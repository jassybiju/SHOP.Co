import { useUser } from "@/hooks/useUser";
import { cloneElement } from "react";
import toast from "react-hot-toast";
import { Navigate, redirect, useNavigate } from "react-router";

const ProtectedFunctionsWrapper = ({children , fn}) => {
    const navigate = useNavigate()
    const {data : user} = useUser()
    console.log(user)
    const handleClick = (e) => {
        console.log(user?.active)
        e.preventDefault()
        if(user?.active){
            fn(e)
        }else{
            toast.error("Login to continue")
            navigate('/auth/login',{replace : true})
        }
    }

  return cloneElement(children,{onClick : handleClick});
};
export default ProtectedFunctionsWrapper;
