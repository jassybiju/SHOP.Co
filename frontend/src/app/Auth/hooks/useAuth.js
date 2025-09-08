import { useMutation } from "@tanstack/react-query";
import {
    loginUser,
    logoutUser,
    registerUser,
    verifyOtp,
} from "../services/auth.service";
import { useStore } from "../../../store/store";
import { useNavigate } from "react-router";

export const useRegister = () => {
    return useMutation({ mutationFn: registerUser });
};

export const useVerifyOtp = () => useMutation({ mutationFn: verifyOtp });
export const useLoginUser = () => useMutation({ mutationFn: loginUser });
export const useLogoutUser = () => {
    const clearUser = useStore((state) => state.clearUser);
    const navigate = useNavigate();
    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            clearUser();
            navigate("/auth/login");
        },
    });
};
