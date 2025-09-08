import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(persist((set) => ({
    user : null,
    setUser : (user) => set({user}),
    clearUser : () => set({user : null}),
    // otp Expiry 
    otpExpiry : null,
    setOtpExpiry : (expiry) => set({otpExpiry : expiry}),
    clearOtpExpiry : () => set({otpExpiry: null})
})));
