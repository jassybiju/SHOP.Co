import { LoaderContext } from "@/components/LoaderContext";
import { useContext } from "react";

const useLoader = () => {
  return useContext(LoaderContext)
};
export default useLoader;
