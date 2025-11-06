import { Loader2 } from "lucide-react";

const Loader = ({width = 99}) => {
  return <div className=" h-[80vh] flex justify-center items-center" style={{width : `${width}vw`}}>
    <Loader2 className="animate-spin "/>
  </div>;
};
export default Loader;
