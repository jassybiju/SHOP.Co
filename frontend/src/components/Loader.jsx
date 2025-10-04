import { Loader2 } from "lucide-react";

const Loader = () => {
  return <div className="w-[99vw] h-[80vh] flex justify-center items-center">
    <Loader2 className="animate-spin "/>
  </div>;
};
export default Loader;
