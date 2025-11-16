import { useState } from "react";
import { LoaderContext } from "./LoaderContext";

const LoaderProvider = ({children}) => {
    const [show, setShow] = useState(false)
    const handleShowLoader = () => {
        if(show){
            document.body.style.overflow = 'auto'
            setShow(false)
        }else{
            document.body.style.overflow = 'hidden'
            setShow(true)
        }
    }

  return <LoaderContext.Provider value={{show,handleShowLoader}}>{children}</LoaderContext.Provider>;
};
export default LoaderProvider;
