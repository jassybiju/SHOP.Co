import React from "react";
import { Link, useNavigate } from "react-router";
import {
    useDeleteAddress,
    useGetAllAddress,
    useSetAsPrimaryAddress,
} from "../../hooks/useAccount";
import PropTypes from "prop-types";

const Address = () => {
    const { data: addresses } = useGetAllAddress();
    console.log(addresses);
    return (
        <div className="w-3/5 mx-auto shadow-xl ring ring-gray-200 rounded-xl px-20 py-10 ">
            <div className="pb-5 mb-5 flex justify-between text-2xl font-normal border-b-2">
                <span>Here you can manage your addresses</span>
            </div>
            <div>
                {addresses?.data?.map((x) => (
                    <AddressComponent data={x} key={x._id} />
                ))}
                {/* <AddressComponent /> */}
                <Link
                    to={"/account/address/add"}
                    className="bg-black px-10 py-3 rounded text-white hover:bg-gray-800"
                >
                    Add New Address
                </Link>
            </div>
        </div>
    );
};

const AddressComponent = ({ data }) => {
    const { mutate: deleteAddress } = useDeleteAddress();
    const { mutate: setAsPrimary } = useSetAsPrimaryAddress();
    const navigate = useNavigate();
    return (
        <div className="w-full border-2 rounded-lg  flex justify-between py-2 px-4">
            <div>
                {data.first_name + " " + data.last_name} ,{data.address}
                <br />
                {data.place}, {data.state},
                <br />
                {data.pincode}
                <br />
                Contact : {data.phone}
            </div>
            <div className="flex flex-col justify-between items-end">
                <div>
                    <span className="bg-gray-500 text-white text-sm px-4 py-1 rounded-full mx-3">
                        {data.address_type}
                    </span>
                    {data.is_primary ? (
                        "primary"
                    ) : (
                        <>
                            <button
                                className="underline cursor-pointer "
                                onClick={() => setAsPrimary(data._id)}
                            >
                                set as primary
                            </button>
                        </>
                    )}
                </div>
                
                <div className="gap-2 flex">
                    <button
                        className="bg-black text-white px-8 py-1 rounded hover:bg-gray-800"
                        onClick={() =>
                            navigate("/account/address/edit/" + data._id)
                        }
                    >
                        Edit
                    </button>
                    <button
                        className="bg-gray-400 text-white px-8 py-1 rounded hover:bg-gray-500"
                        onClick={() => deleteAddress(data._id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};
export default Address;

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
