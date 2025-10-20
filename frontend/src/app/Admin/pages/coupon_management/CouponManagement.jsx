import Header from "../../components/Header";
import Search from "../../components/Search";
import Dropdown from "../../components/Dropdown";
import { useState } from "react";
import { useModal } from "@/hooks/useModal";
import ModalWrapper from "@/components/ModalWrapper";
import AddCoupon from "./components/AddCoupon";
import TableComponent from "../../components/TableComponent";
import { useGetAllCoupons } from "../../hooks/useCouponManagement";
import { Loader2 } from "lucide-react";
import EditCoupon from "./components/EditCoupon";

const filterOptions = [];

const CouponManagement = () => {
    const [params, setParams] = useState([]);
    const {openModal} = useModal()

    const {data : couponRes , status : getCouponStatus } = useGetAllCoupons()
    console.log(couponRes)

    const showAddCoupon = () => {
        openModal('add-coupon',<ModalWrapper render={<AddCoupon/>}/>)
    }
    const showEditCoupon = (id) => {
        openModal('edit-coupon', <ModalWrapper render={<EditCoupon id={id}/>}/>)
    }


    if(getCouponStatus === 'pending') return <Loader2 />

    const column = [
        {label : "Sl No" , render : (val)=>val},
        {label : "Code" , key : "code"},
        {label : "Discount", render : (_, row)=>(<>{row.discount_percentage} {row.max_discount_amount} {row.min_order_amount}</>)},
        {label : "Code" , key : "usage_limit"},
        {label : "Code" , key : "expiry_date"},
        {label : "edit", render : (_,row)=> (
            <button onClick={()=>showEditCoupon(row._id)}>Edit</button>
        )}
    ]

    console.log(couponRes)

    return (
        <div>
            <Header heading="Coupon Management" />
            <div className=" flex justify-between mx-6">
                <div className="flex gap-5 w-[60%] ">
                    <Search
                        value={params.search}
                        onChange={(e) =>
                            setParams((state) => ({
                                ...state,
                                search: e.target.value,
                            }))
                        }
                    />
                    <Dropdown
                        label="Filter by"
                        onChange={(e) =>
                            setParams((state) => ({
                                ...state,
                                filter: e.target.value,
                            }))
                        }
                        options={filterOptions}
                    />
                </div>
                <button
                    type="submit"
                    className="hover:text-gray-700 h-auto flex  rounded px-10 p-2  gap-4 text-xl items-center bg-violet-700 hover:bg-violet-500 text-white"
                    onClick={showAddCoupon}
                >
                    Add Coupon
                </button>
            </div>

            <TableComponent data={couponRes.data} column={column}  />
        </div>
    );
};
export default CouponManagement;
