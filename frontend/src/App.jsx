import { RouterProvider } from "react-router";
import { router } from "./app/route";
import { Toaster } from "react-hot-toast";
import 'react-image-crop/dist/ReactCrop.css'


import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import { ModalProvider } from "./components/ModalProvider";


import 'react-inner-image-zoom/lib/styles.min.css'
import LoaderProvider from "./components/LoaderProvider";
import useLoader from "./hooks/useLoader";
import Loader from "./components/Loader";

const App = () => {
    const value = useLoader()
    console.log(value)

    return (
        <>
        <LoaderProvider>
        <ReactQueryDevtools/>
            <Toaster toastOptions={{className : "z-9999"}}/>
            <ModalProvider>

                <RouterProvider router={router} hydrateFallback={<Loader/>} />

           </ModalProvider>
           </LoaderProvider>
        </>
    );
};
export default App;
