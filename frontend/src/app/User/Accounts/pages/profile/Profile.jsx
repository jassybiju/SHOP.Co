import React from "react";
import InputComponent from "@/components/InputComponent";
import Button from "@/app/User/components/Button";
import { useNavigate } from "react-router";
import { useUser } from "@/hooks/useUser";

const Profile = () => {
	const navigate = useNavigate();
	const { data: user } = useUser();
	console.log(user);
	return (
		<>
			<div className="pb-4 mb-6 flex flex-col md:flex-row md:justify-between text-xl md:text-2xl font-semibold border-b-2 gap-2 md:gap-0">
				<span>Your Details</span> <span>Personal Information</span>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<InputComponent label={"First Name"} value={user.first_name} width={100} readonly />
				<InputComponent label={"Last Name"} value={user.last_name} width={100} readonly />
			</div>
			<div className="mt-6 space-y-6">
				<InputComponent label={"Email"} value={user.email} width={100} readonly />
				<InputComponent
					label={"Phone Number"}
					value={user.phone || "No Number Provided"}
					width={100}
					readonly
				/>
			</div>
			<div className="mt-6 space-y-6">
				<h1 className="font-semibold text-lg">
					Refferal ID : {user.refferal_id}
					<span className="block md:inline text-sm text-gray-500">( reffer and earn existing reward)</span>
				</h1>
				<div className="flex justify-end mt-8">
					<Button label="Edit" onClick={() => navigate("/account/edit")} />
				</div>
			</div>
		</>
	);
};
export default Profile;
