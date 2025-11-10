import toast from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router";

const RedirectIfNoOTP = ({ children }) => {
    const { state = {} } = useLocation();
    const navigate = useNavigate();
    console.log("---------------", state?.email);

    if (!state?.email || !state?.otpExpiry) {
        console.log("123");
        toast.error("No OTP")
        return <Navigate to={"/auth/register"} replace />;
    }

    return children;
};
export default RedirectIfNoOTP;
