import { RouterProvider } from "react-router";
import { router } from "./app/route";
import Navbar from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useStore } from "./store/store";
import { axiosInstance } from "./app/Auth/services/api/axiosInstance";
import axios from "axios";
import useFetchUserRole from "./hooks/useFetchUserRole";
import { useFetchUser } from "./app/Auth/hooks/useAuth";
import { Loader } from "lucide-react";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
const App = () => {
    

    useFetchUser()
    
    return (
        <>
        <ReactQueryDevtools/>
            <Toaster toastOptions={{className : "z-9999"}}/>
            
                <RouterProvider router={router} hydrateFallback={<>Loading</>} />
           
        </>
    );
};
export default App;
