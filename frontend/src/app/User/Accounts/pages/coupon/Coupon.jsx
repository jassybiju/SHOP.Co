import { Copy } from "lucide-react";
import { useGetUserCoupons } from "../../hooks/useAccount";

const Coupon = () => {
	const { data } = useGetUserCoupons();
	console.log(data);
	return (
		<>
			<div className="pb-5 mb-5 flex justify-between text-2xl font-semibold border-b-2">
				<span>Your Coupons</span> <span></span>
			</div>
			<div className="flex gap-10 w-full flex-col">
				{data?.data.map((x) => (
					<div key={x._id} className="px-6 py-2 bg-gray-300 w-full rounded">
						{/* Discount Badge */}
						{/* <div className="mb-2 inline-block rounded-lg bg-primary/10 px-3 py-1">
                  <span className="text-sm font-semibold text-primary">{x.discount_percentage} %</span>
                </div> */}

						{/* Description */}
						<h3 className="text-lg font-semibold text-foreground">{x.description}</h3>

						{/* Coupon Code */}
						<div className="mb-1 flex items-center gap-2 rounded-lg bg-muted p-2">
							<code className="flex-1 font-mono text-sm font-bold text-foreground">
								{x.code}
							</code>
						</div>

						{/* Details */}
						<div className="space-y-2 text-sm text-muted-foreground">
							{x.min_order_amount && (
								<p>
									<span className="font-semibold text-foreground">
										Minimum Order Amount:
									</span>{" "}
									{x.min_order_amount} <br />
									<span className="font-semibold text-foreground">
										Max Discount Amount:
									</span>{" "}
									{x.max_discount_amount}
								</p>
							)}
							<p>
								<span className="font-semibold text-foreground">Expires:</span>{" "}
								{x.expiry_date}
							</p>
						</div>
					</div>
				))}
			</div>
		</>
	);
};
export default Coupon;
