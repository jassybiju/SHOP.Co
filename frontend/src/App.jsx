import { RouterProvider } from "react-router";
import { router } from "./app/route";
import Navbar from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import 'react-image-crop/dist/ReactCrop.css'


import { Loader } from "lucide-react";
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
const App = () => {
    

    
    
    return (
        <>
        <ReactQueryDevtools/>
            <Toaster toastOptions={{className : "z-9999"}}/>
            
                <RouterProvider router={router} hydrateFallback={<>Loading</>} />
           
        </>
    );
};
export default App;
