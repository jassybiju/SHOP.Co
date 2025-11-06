import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUser } from "../app/Auth/services/auth.service";
import toast from "react-hot-toast";

export function useUser() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["user"],
    queryFn: async()=>{ try {
        const user = await fetchUser();
        console.log(778)
        console.log(user)
        return user;
      } catch (err) {
        console.log(err.response.data.data)
        console.log(8883)
        // Clear the cached user immediately
        queryClient.setQueryData(["user"], null);
        // toast.error("eroro")
        throw err; // so isError becomes true
      }
    },
    
    staleTime: 0,            // always stale, so refetch on mount
    cacheTime: 1000 * 60,    // keep cached data for 1 min
    refetchOnMount: 'always',    // refetch every mount
    refetchOnWindowFocus: true,
    retry: 1,
    onError: (error) => {
      
      const status = error.response?.status; 
      console.log(error, 7777)
      if (status === 401 || status === 403) {
      
        localStorage.removeItem('token'); 
        
      
        queryClient.removeQueries({ queryKey: ["user"] });
      
      } else {
    
        queryClient.removeQueries({ queryKey: ["user"] }); 
      }
    },
  });
}
