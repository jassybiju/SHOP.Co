import React from "react";
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
import UserDetails from "./Admin/pages/user_management/UserDetails";
import ProductManagement from "./Admin/pages/product_management/ProductManagement";
import BrandMangement from "./Admin/pages/brand_management/BrandMangement";
import CategoryMangement from "./Admin/pages/category_management/CategoryMangement";
import AddProduct from "./Admin/pages/product_management/AddProduct";
import ViewProduct from "./Admin/pages/product_management/ViewProduct";
import EditProduct from "./Admin/pages/product_management/EditProduct";
import Home from "./Home/pages/home/Home";
import SearchPage from "./Home/pages/search/SearchPage";
import ResetPassword from "./Auth/pages/change-password/ResetPassword";
import GoogleWrapper from "../components/GoogleWrapper";
import ProductPage from "./Home/pages/product/ProductPage";
import About from "./Home/pages/about/About";
import Contact from "./Home/pages/contact/Contact";
import Profile from "./User/Accounts/pages/profile/Profile";
import RedirectIfNotLoggedIn from "./Auth/components/RedirectIfNotLoggedIn";
import AccountLayout from "./Layout/AccountLayout";
import EditProfile from "./User/Accounts/pages/profile/components/EditProfile";
import ChangePassword from "./User/Accounts/pages/profile/components/ChangePassword";
import Address from "./User/Accounts/pages/address/Address";
import AddAddress from "./User/Accounts/pages/address/AddAddress";
import EditAddress from "./User/Accounts/pages/address/EditAddress";
import Cart from "./User/pages/cart/Cart";
import Checkout from "./User/pages/checkout/Checkout";
import Order from "./User/Accounts/pages/order/Order";
import OrderManagement from "./Admin/pages/order_management/OrderManagement";
import ViewOrderManagement from "./Admin/pages/order_management/ViewOrderManagemenet";
import ViewOrder from "./User/Accounts/pages/order/ViewOrder";
import StockManagement from "./Admin/pages/stock_management/StockManagement";
import OrderSuccessful from "./User/Accounts/pages/order/OrderSuccessful";
import CouponManagement from "./Admin/pages/coupon_management/CouponManagement";
import Wallet from "./User/Accounts/pages/wallet/Wallet";
import SalesReport from "./Admin/pages/saleReport/salesReport";
import Coupon from "./User/Accounts/pages/coupon/Coupon";
import Wishlist from "./User/pages/wishlist/Wishlist";
import PaymentFailed from "./User/Accounts/pages/order/PaymentFailed";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route
                path="/"
                element={<AppLayout />}
                errorElement={<>Erorr</>}
                hydrateFallbackElement={<>Loading...</>}
            >
                <Route index element={<Home />}></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/search" element={<SearchPage />}></Route>
                <Route path="/product/:id" element={<ProductPage />}></Route>
                <Route
                    path="auth/otp-verify"
                    element={
                        <RedirectIfNoOTP>
                            <OTPVerify />
                        </RedirectIfNoOTP>
                    }
                />
                <Route
                    path="auth/forget-password"
                    element={<ForgetPassword />}
                />

                <Route
                    path="auth/reset-password"
                    element={
                        <>
                            <ResetPassword />
                        </>
                    }
                />
                <Route path="auth" element={<RedirectIfLoggedIn />}>
                    <Route
                        path="register"
                        element={
                            <GoogleWrapper>
                                <Register />
                            </GoogleWrapper>
                        }
                    />
                    <Route
                        path="login"
                        element={
                            <GoogleWrapper>
                                <Login />
                            </GoogleWrapper>
                        }
                    />
                </Route>
            </Route>

            {/* ! // USER SIDE  */}
            <Route element={<RedirectIfNotLoggedIn />}>
                <Route element={<AppLayout />}>
                    <Route element={<Cart />} path="/cart"></Route>
                    <Route element={<Wishlist />} path="/wishlist"></Route>
                    <Route element={<Checkout />} path="/checkout"></Route>

                </Route>
                <Route element={<AccountLayout />} path="account">
                    <Route index element={<Profile />} />
                    <Route path="edit" element={<EditProfile />}></Route>
                    <Route
                        path="edit/change-password"
                        element={<ChangePassword />}
                    />
                    <Route path="address" element={<Address />} />
                    <Route path="address/add" element={<AddAddress />} />
                    <Route path="address/edit/:id" element={<EditAddress />} />

                    <Route path='wallet' element={<Wallet/>}/>
                    <Route path="orders" element={<Order />} />
                    <Route path="orders/:id" element={<ViewOrder />} />

                    <Route path="coupon" element={<Coupon/>}></Route>
                </Route>
                <Route path="order/successful" element={<OrderSuccessful />} />
                <Route path="order/failed" element={<PaymentFailed />} />

               {/* // ADMIN SIDE  */}
                <Route
                    element={
                        <RoleBasedProtectedRoute allowedRoles={["admin"]} />
                    }
                >
                    <Route path="admin" element={<AdminLayout />}>
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
                        <Route path="order-management">
                            <Route index element={<OrderManagement />} />
                            <Route
                                path="view/:id"
                                element={<ViewOrderManagement />}
                            />
                        </Route>
                        <Route path="stock-management">
                            <Route index element={<StockManagement />} />
                            <Route
                                path="view/:id"
                                element={<ViewOrderManagement />}
                            />
                        </Route>
                        <Route path='coupon-management'>
                            <Route index element={<CouponManagement/>}/>
                        </Route>
                        <Route path="sales-report">
                            <Route index element={<SalesReport/>}/>

                        </Route>
                    </Route>
                </Route>
                <Route path="*" element={<>404</>}></Route>
            </Route>
        </>
    )
);
