import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(persist((set) => ({
    user : null,
    isUserLoading : false,
    setLoading : (loading) =>{console.log(loading); set({isUserLoading : loading})},
    setUser : (user) =>{console.log(user); set({user}), set({isUserLoading : false})},
    clearUser : () => set({user : null}),
    // otp Expiry 
    otpExpiry : null,
    setOtpExpiry : (expiry) => set({otpExpiry : expiry}),
    clearOtpExpiry : () => set({otpExpiry: null})
})));
