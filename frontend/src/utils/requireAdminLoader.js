import { redirect } from "react-router-dom";
import { fetchUser } from "../app/Auth/services/auth.service";
import { useQueryClient } from "@tanstack/react-query";
import queryClient from "./queryClient";

export const requireAdminLoader = async () => {
    let user = null;
    
    try {
        // Attempt to fetch the user
        user = await fetchUser(); 
    } catch (error) {
        queryClient.invalidateQueries({queryKey : ["user"]})
        console.error("Auth fetch failed in loader:", error);
        console.log(user)
        // Treat any network or token error as unauthenticated
        return redirect("/auth/login");
    }

    console.log(user)
    if (!user) return redirect("/auth/login"); 

   
    if (!user.active) return redirect("/auth/login"); 

    if (user.role !== "admin") return redirect("/"); 

    return null; 
};