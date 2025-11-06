import { useCancelOrder, useReturnOrder } from "@/app/User/hooks/useOrder";
import useCommentModal from "@/hooks/useCommentModal";

const CTAButton = ({ status, id }) => {
	const onClickComment = useCommentModal();
	const { mutate: cancelOrder } = useCancelOrder();
	const { mutate: returnOrder } = useReturnOrder();
	console.log(status);
	if (status === "PLACED") {
		return (
			<button
				className="px-3 py-2 bg-red-400 rounded border-1 text-white"
				onClick={() =>
					onClickComment((x) =>
						cancelOrder({
							id: id,
							data: { reason: x },
						})
					)
				}
			>
				Cancel Order
			</button>
		);
	} else if (status === "DELIVERED") {
		return (
			<button
				className="px-3 py-2 bg-red-400 rounded border-1 text-white"
				onClick={() =>
					onClickComment((x) =>
						returnOrder({
							id: id,
							data: { reason: x },
						})
					)
				}
			>
				Return Order
			</button>
		);
	}
};
export default CTAButton;
