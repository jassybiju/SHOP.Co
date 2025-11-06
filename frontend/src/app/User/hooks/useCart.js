import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCart, removeCartItem, updateCartItem } from "../services/cart.service";

export const useGetAllCart = () => {
	return useQuery({
		queryFn: getAllCart,
		queryKey: ["cart"],
	});
};

export const useUpdateCartItems = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: updateCartItem,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cart"] });
			queryClient.invalidateQueries({ queryKey: ["wishlist"] });
		},
	});
};

export const useRemoveCartItems = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: removeCartItem,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
	});
};
