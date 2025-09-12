import { Navigate, Outlet } from "react-router";
import { useStore } from "../../../store/store";
import { Loader } from "lucide-react";
import { useFetchUser } from "../hooks/useAuth";
import { useEffect } from "react";


const RedirectIfNotLoggedIn = ({children}) => {
  const {data , isLoading , isError} = useFetchUser()
    const {user , isUserLoading , setUser, clearUser} = useStore()
    console.log(123343)
    useEffect(()=>{
      console.log(isError)
      if(data){
        setUser(data)
      }else if(!isLoading && isError){

        clearUser()
      }
      console.log(data)
    },[data, setUser, isLoading, isError , clearUser])
    if(isUserLoading || isLoading){
      return <Loader/>
    }
    if(user ){
      console.log('123s')
      return   children
    }else{
      console.log('1223s')

        return <Navigate to='/auth/login' replace/>
    }

  
};
export default RedirectIfNotLoggedIn;
