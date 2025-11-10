import { RouterProvider } from "react-router";
import { router } from "./app/route";
import { Toaster } from "react-hot-toast";
import 'react-image-crop/dist/ReactCrop.css'


import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import { ModalProvider } from "./components/ModalProvider";


import 'react-inner-image-zoom/lib/styles.min.css'

const App = () => {



    return (
        <>
        <ReactQueryDevtools/>
            <Toaster toastOptions={{className : "z-9999"}}/>
            <ModalProvider>
            
                <RouterProvider router={router} hydrateFallback={<>Loading</>} />
           </ModalProvider>
        </>
    );
};
export default App;
