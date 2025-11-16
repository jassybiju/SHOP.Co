import useLoader from "@/hooks/useLoader";
import { Loader2 } from "lucide-react";
import { createPortal } from "react-dom";

const Loader = ({width = 100}) => {
    // const {show:value} = useLoader()
    // if(!value){
    //     return ''
    // }
  return createPortal(<div className=" h-[100vh] absolute top-0 inset flex  z-[10000] bg-black/50 justify-center items-center" style={{width : `${width}vw`}}>
    <Loader2 className="animate-spin "/>
  </div>,
document.body);
}
export default Loader;
