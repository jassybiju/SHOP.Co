import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUser } from "../app/Auth/services/auth.service";

export function useUser() {
	const queryClient = useQueryClient();

	return useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			try {
				const user = await fetchUser();
				console.log(778);
				console.log(user);
				return user;
			} catch (err) {
				console.log(err.response.data.data);
				console.log(8883);
				queryClient.setQueryData(["user"], null);
				throw err;
			}
		},

		staleTime: 0,
		cacheTime: 1000 * 60,
		refetchOnMount: "always",
		refetchOnWindowFocus: true,
		retry: 1,
		onError: (error) => {
			const status = error.response?.status;
			console.log(error, 7777);
			if (status === 401 || status === 403) {
				localStorage.removeItem("token");

				queryClient.removeQueries({ queryKey: ["user"] });
			} else {
				queryClient.removeQueries({ queryKey: ["user"] });
			}
		},
	});
}
