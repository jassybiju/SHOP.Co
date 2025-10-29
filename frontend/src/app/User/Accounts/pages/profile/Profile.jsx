import React from 'react'
import InputComponent from "@/components/InputComponent";
import Sidebar from "../../components/Sidebar";
import Button from "@/app/User/components/Button";
import { useNavigate } from "react-router";
import { useUser } from "@/hooks/useUser";

const Profile = () => {
    const navigate=  useNavigate()
    const {data : user} = useUser()
    console.log(user)
    return (
        <div className="w-3/5 mx-auto shadow-xl ring ring-gray-200 rounded-xl px-20 py-10 ">
            <div className="pb-5 mb-5 flex justify-between text-2xl font-semibold border-b-2">
                <span>Your Details</span> <span>Personal Information</span>
            </div>
            <div className="flex gap-10">

                <InputComponent label={"First Name"} value={user.first_name} width={100} readonly />
                <InputComponent label={"Last Name"} value={user.last_name} width={100} readonly/>
            </div>
            <InputComponent label={"Email"} value={user.email} width={100} readonly/>
            <InputComponent label={"Phone Number"} value={user.phone || "No Number Provided"} width={100} readonly/>
            <h1 className='font-semibold text-lg'>Refferal ID : {user.refferal_id}<span className='font-normal text-sm'>( reffer and earn existing reward)</span></h1>
            <div className="flex justify-end">
                <Button label="Edit" onClick={()=>navigate('/account/edit')}/>
            </div>
        </div>
    );
};
export default Profile;
