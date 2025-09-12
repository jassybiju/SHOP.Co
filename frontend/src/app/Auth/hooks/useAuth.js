import { useMutation, useQuery } from "@tanstack/react-query";
import {
    fetchUser,
    loginUser,
    logoutUser,
    registerUser,
    verifyOtp,
} from "../services/auth.service";
import { useStore } from "../../../store/store";
import {  useNavigate } from "react-router";

export const useRegister = () => {
    return useMutation({ mutationFn: registerUser });
};

export const useVerifyOtp = () => useMutation({ mutationFn: verifyOtp });
export const useLoginUser = () => {
    const { setUser } = useStore();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: loginUser,
        
        onSuccess: (data) => {
            setUser(data);
            console.log(data.role==='admin');
            navigate('/admin')
        },
    });
};
export const useLogoutUser = () => {
    const clearUser = useStore((state) => state.clearUser);
    const navigate = useNavigate();
    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            console.log(123);
            clearUser();
            navigate("/auth/login");
        },
    });
};

export const useFetchUser = () => {

    return useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry : 0
    });
};
