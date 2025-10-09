import {
    QueryClient,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import {
    fetchUser,
    forgetPassword,
    loginUser,
    logoutUser,
    registerUser,
    resendOtp,
    resetPassword,
    verifyOtp,
} from "../services/auth.service";
import { useStore } from "../../../store/store";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export const useRegister = () => {
    return useMutation({
        mutationFn: registerUser,
        onError: (error) => {
            toast.error(error.response.data.message);
        },
    });
};

export const useLoginUser = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: loginUser,

        onSuccess: (data) => {
            console.log(data);
            navigate("/admin");
        },
    });
};
export const useLogoutUser = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            queryClient.clear();
            console.log(123);
            toast.success("Logout success");
            navigate("/auth/login");
        },
    });
};

export const useForgetPassword = () =>
    useMutation({ mutationFn: forgetPassword });

export const useVerifyOtp = () => useMutation({ mutationFn: verifyOtp });
export const useResendOtp = () => useMutation({ mutationFn: resendOtp });
export const useResetPassword = () => useMutation({ mutationFn: resetPassword });
// export const useResetPassword = () => useMutation({ mutationFn: resetPassword });
// export const useFetchUser = () => {

//     return useQuery({
//         queryKey: ["user"],
//         queryFn: fetchUser,
//         staleTime: 5 * 60 * 1000,
//         refetchOnWindowFocus: false,
//         retry : 0
//     });
// };
