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
import Dashboard from "./Admin/pages/Dashboard/Dashboard";
import RoleBasedProtectedRoute from "../components/RoleBasedProtectedRoute";
import AdminLayout from "./Layout/AdminLayout";
import UserManagement from "./Admin/pages/user_management/UserManagement";
import { requireAuthLoader } from "../utils/requireAuthLoader";
import UserDetails from "./Admin/pages/user_management/UserDetails";
import ProductManagement from "./Admin/pages/product_management/ProductManagement";
import BrandMangement from "./Admin/pages/brand_management/BrandMangement";
import CategoryMangement from "./Admin/pages/category_management/CategoryMangement";
import AddProduct from "./Admin/pages/product_management/AddProduct";
import ViewProduct from "./Admin/pages/product_management/ViewProduct";
import EditProduct from "./Admin/pages/product_management/EditProduct";
import Home from "./Home/pages/home/Home";
import Search from "./Home/pages/search/Search";
import ResetPassword from "./Auth/pages/change-password/ResetPassword";
import GoogleWrapper from "../components/GoogleWrapper";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route
                path="/"
                errorElement={<>Erorr</>}
                hydrateFallbackElement={<>Loading...</>}
            >
                <Route index element={<Home />}></Route>
                <Route path='/search' element={<Search/>}></Route>
                {/* <Route
                    index
                    element={
                        <>
                            <AppLayout></AppLayout>
                        </>
                    }
                /> */}

                {/* /admin route  */}
                <Route
                    path="admin"
                    element={
                        <>
                            <RoleBasedProtectedRoute allowedRoles={["admin"]}>
                                <AdminLayout />
                            </RoleBasedProtectedRoute>
                        </>
                    }
                >
                    <Route path="" element={<Dashboard />} />
                    <Route path="user-management">
                        <Route index element={<UserManagement />} />
                        <Route path=":id" element={<UserDetails />} />
                    </Route>
                    <Route path="product-management">
                        <Route index element={<ProductManagement />} />
                        <Route path="add" element={<AddProduct />} />
                        <Route path="view/:id" element={<ViewProduct />} />
                        <Route path="edit/:id" element={<EditProduct />} />
                    </Route>
                    <Route path="brand-management">
                        <Route index element={<BrandMangement />} />
                    </Route>
                    <Route path="category-management">
                        <Route index element={<CategoryMangement />} />
                    </Route>
                </Route>

                <Route path="auth">
                    <Route path="register" element={<Register />} />
                    <Route path="login" element={<GoogleWrapper><Login /></GoogleWrapper>} />
                    <Route
                        path="otp-verify"
                        element={
                            <RedirectIfNoOTP>
                                <OTPVerify />
                            </RedirectIfNoOTP>
                        }
                    />
                    <Route path="forget-password"element={<ForgetPassword />}/>
                    <Route path="reset-password"element={<ResetPassword />}/>
                </Route>

                <Route path="/">
                        
                </Route>
            </Route>
        </>
    )
);
