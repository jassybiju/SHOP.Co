import React from "react";
import { Link, useNavigate } from "react-router";
import { useGetAllAddress } from "../../hooks/useAccount";

import AddressComponent from "./component/AddressComponent";

const Address = () => {
	const { data: addresses } = useGetAllAddress();
	console.log(addresses);
	return (
		<>
			{/* Header */}
			<div className="pb-4 mb-6 flex flex-col md:flex-row justify-between text-xl md:text-2xl font-semibold border-b-2 gap-2">
				<span>Manage Your Addresses</span>
				<span className="font-normal text-gray-600">Shipping & Delivery</span>
			</div>

			{/* Address List */}
			<div className="flex flex-col gap-4">
				{addresses?.data?.length > 0 ? (
					addresses.data.map((x) => <AddressComponent data={x} key={x._id} />)
				) : (
					<div className="text-center py-6 text-gray-500 text-sm md:text-base">
						No addresses found. Add a new one below.
					</div>
				)}

				{/* Add Button */}
				<div className="flex justify-center md:justify-start mt-6">
					<Link
						to="/account/address/add"
						className="bg-black px-6 md:px-10 py-3 rounded-md text-white hover:bg-gray-800 text-sm md:text-base"
					>
						+ Add New Address
					</Link>
				</div>
			</div>
		</>
	);
};

export default Address;
