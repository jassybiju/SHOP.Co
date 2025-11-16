import Header from "../../components/Header";
import Search from "../../components/Search";
import Dropdown from "../../../../components/Dropdown";
import { useState } from "react";
import { useModal } from "@/hooks/useModal";
import ModalWrapper from "@/components/ModalWrapper";
import AddCoupon from "./components/AddCoupon";
import TableComponent from "../../components/TableComponent";
import { useGetAllCoupons, useToggleCoupon } from "../../hooks/useCouponManagement";
import { Loader2 } from "lucide-react";
import EditCoupon from "./components/EditCoupon";
import ToggleBtn from "../product_management/ui/ToggleBtn";
import Loader from "@/components/Loader";

const filterOptions = [
    {label : "Active" , value : 'active'},
    {label : "In Active" , value : 'in-active'},
    {label : "All" , value : 'all'},
];

const CouponManagement = () => {
	const [params, setParams] = useState({q : '', page : 1, limit : 4});
	const { openModal } = useModal();

	const { data: couponRes, status: getCouponStatus } = useGetAllCoupons(params);
	const {mutate : toggleCoupon} = useToggleCoupon()

	const showAddCoupon = () => {
		openModal("add-coupon", <ModalWrapper render={<AddCoupon />} />);
	};
	const showEditCoupon = (id) => {
		openModal("edit-coupon", <ModalWrapper render={<EditCoupon id={id} />} />);
	};

	if (getCouponStatus === "pending") return <Loader />;

	const column = [
{
			label: "Sl No",
			key: "_id",
			render: (_, row, data) => data.indexOf(row) + 1,
		},		{ label: "Code", key: "code" },
		{
			label: "Discount",
			render: (_, row) => (
				<>
					{row.discount_percentage}%  <br />MAX :{row.max_discount_amount} MIN : {row.min_order_amount}
				</>
			),
		},
		{ label: "Code", key: "usage_limit" },
		{ label: "Code", key: "expiry_date" },
        {label : 'is active', key : 'is_active', render : (val, row)=>(<ToggleBtn state={val} onClick={()=>toggleCoupon(row._id)}/>)},
		{ label: "edit", render: (_, row) => <div className="flex items-center"><button onClick={() => showEditCoupon(row._id)}>Edit</button></div> },
	];

	console.log(couponRes);

	return (
		<div>
			<Header heading="Coupon Management" />
		 {/* Top Filter Section */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 mt-6 mb-6">
        {/* Search + Dropdown */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-[60%]">
          <Search
            value={params.q}
            onChange={(e) =>
              setParams((state) => ({
                ...state,
                q: e.target.value,
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

        {/* Add Button */}
        <button
          type="submit"
          className="hover:text-gray-700 flex justify-center rounded px-6 sm:px-10 py-2 text-lg sm:text-xl items-center bg-violet-700 hover:bg-violet-500 text-white w-full sm:w-auto"
          onClick={showAddCoupon}
        >
          Add Coupon
        </button>
      </div>
			<TableComponent data={couponRes?.data?.coupons} column={column} pages={couponRes?.data?.pages} page={Number(couponRes.data?.page)} onPageChange={(s)=>setParams(x => ({...x, page : s}))}/>
		</div>
	);
};
export default CouponManagement;
