import { RouterProvider } from "react-router";
import { router } from "./app/route";
import Navbar from "./components/Navbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useStore } from "./store/store";
import { axiosInstance } from "./app/Auth/services/api/axiosInstance";
import axios from "axios";
const queryClient = new QueryClient();

const App = () => {
    const { user, setUser } = useStore();

    useEffect(() => {
        async function getData() {
            const data = await axios.get(
                import.meta.env.VITE_BASE_URI + "auth/me",
                { withCredentials: true }
            );
            return data
        }

        if (!user) {
            getData().then((res)=> setUser(res.data))
        }
    }, [user, setUser]);

    return (
        <>
            <Toaster />
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </>
    );
};
export default App;
