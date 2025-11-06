import React from "react";
import PropTypes from "prop-types";
import { useDeleteAddress, useSetAsPrimaryAddress } from "../../../hooks/useAccount";
import { useNavigate } from "react-router";

const AddressComponent = ({ data }) => {
	const { mutate: deleteAddress } = useDeleteAddress();
	const { mutate: setAsPrimary } = useSetAsPrimaryAddress();
	const navigate = useNavigate();
	return (
		<div className="border-2 rounded-xl p-4 md:p-6 flex flex-col md:flex-row justify-between gap-4 hover:shadow-md transition-all duration-200">
			{/* Address Details */}
			<div className="flex-1 text-sm md:text-base leading-relaxed">
				<div className="font-semibold text-gray-800">
					{data.first_name} {data.last_name}
				</div>
				<div className="text-gray-600 mt-1">
					{data.address}, {data.place}, {data.state} - {data.pincode}
				</div>
				<div className="mt-1">📞 {data.phone}</div>
			</div>

			{/* Right Section */}
			<div className="flex flex-col md:items-end gap-3">
				{/* Address Type + Primary */}
				<div className="flex items-center gap-2 flex-wrap">
					<span className="bg-gray-500 text-white text-xs md:text-sm px-3 py-1 rounded-full">
						{data.address_type}
					</span>

					{data.is_primary ? (
						<span className="text-green-600 text-xs md:text-sm font-semibold">Primary</span>
					) : (
						<button
							className="underline text-sm text-blue-600 hover:text-blue-800"
							onClick={() => setAsPrimary(data._id)}
						>
							Set as primary
						</button>
					)}
				</div>

				{/* Action Buttons */}
				<div className="flex gap-2 mt-2 md:mt-0 flex-wrap">
					<button
						className="bg-black text-white text-sm md:text-base px-6 py-1.5 rounded hover:bg-gray-800"
						onClick={() => navigate("/account/address/edit/" + data._id)}
					>
						Edit
					</button>
					<button
						className="bg-gray-400 text-white text-sm md:text-base px-6 py-1.5 rounded hover:bg-gray-500"
						onClick={() => deleteAddress(data._id)}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

AddressComponent.propTypes = {
	data: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		first_name: PropTypes.string.isRequired,
		last_name: PropTypes.string.isRequired,
		address: PropTypes.string.isRequired,
		place: PropTypes.string.isRequired,
		state: PropTypes.string.isRequired,
		pincode: PropTypes.string,
		phone: PropTypes.string.isRequired,
		address_type: PropTypes.string,
		is_primary: PropTypes.bool,
	}).isRequired,
};

export default AddressComponent;
