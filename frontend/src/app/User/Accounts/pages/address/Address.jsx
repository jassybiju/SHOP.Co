import React from "react";
import { Link, useNavigate } from "react-router";
import {

    useGetAllAddress,

} from "../../hooks/useAccount";

import AddressComponent from "./component/AddressComponent";

const Address = () => {
    const { data: addresses } = useGetAllAddress();
    console.log(addresses);
    return (
        <div className="w-3/5 mx-auto shadow-xl ring ring-gray-200 rounded-xl px-20 py-10 ">
            <div className="pb-5 mb-5 flex justify-between text-2xl font-normal border-b-2">
                <span>Here you can manage your addresses</span>
            </div>
            <div className="flex flex-col gap-2">
                {addresses?.data?.map((x) => (
                    <AddressComponent data={x} key={x._id} />
                ))}
                {/* <AddressComponent /> */}
                <Link
                    to={"/account/address/add"}
                    className="bg-black px-10 py-3 w-min text-nowrap rounded text-white hover:bg-gray-800"
                >
                    Add New Address
                </Link>
            </div>
        </div>
    );
};

export default Address;
