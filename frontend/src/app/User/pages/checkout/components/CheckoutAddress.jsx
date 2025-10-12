import React from "react";
import PropTypes from "prop-types";
import { useDeleteAddress, useSetAsPrimaryAddress } from "@/app/User/Accounts/hooks/useAccount";
import { useNavigate } from "react-router";
import { useModal } from "@/hooks/useModal";
import AddAddress from "@/app/User/Accounts/pages/address/AddAddress";
import ModalWrapper from "@/components/ModalWrapper";
import EditAddress from "@/app/User/Accounts/pages/address/EditAddress";


const CheckoutAddress = ({data}) => {
 const { mutate: deleteAddress } = useDeleteAddress();
    const { mutate: setAsPrimary } = useSetAsPrimaryAddress();
    const navigate = useNavigate();
    const {openModal , closeModal} = useModal()


    const editModal = (id) => {
        openModal('add-address',<ModalWrapper render={<EditAddress id={id}/>} onX={()=>closeModal('add-address')}/>)
    }

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
                        onClick={()=>editModal(data._id)}
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

CheckoutAddress.propTypes = {
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


export default CheckoutAddress