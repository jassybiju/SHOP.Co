<<<<<<< HEAD
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
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
>>>>>>> 1c8034e5fd80e8fcf26abc7a46238fa4d2ab3adf
