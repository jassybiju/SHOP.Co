import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router";
import Register from "./Auth/pages/register/Register";
import Login from "./Auth/pages/login/Login";
import OTPVerify from "./Auth/pages/otp/OTPVerify";
import ForgetPassword from "./Auth/pages/forget-password/ForgetPassword";
import RedirectIfNoOTP from "./Auth/pages/otp/RedirectIfNoOTP";
import RedirectIfLoggedIn from "./Auth/components/RedirectIfLoggedIn";
import AppLayout from "./Layout/AppLayout";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" errorElement={<>Erorr</>} element={<AppLayout/>}>
                <Route index element={<></>} />
                <Route path="home" element={<></>}/>
                <Route path="auth" element={<RedirectIfLoggedIn/>} >
                    <Route path="register" element={<Register />} />
                    <Route path="login" element={<Login />} />
                    <Route path="otp-verify" element={<RedirectIfNoOTP><OTPVerify /></RedirectIfNoOTP>} />
                    <Route path="forget-password" element={<ForgetPassword />} />
                </Route>
            </Route>
        </>
    )
);
