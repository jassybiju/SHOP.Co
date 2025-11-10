import { useGetWallet } from "../../hooks/useWallet";
import TableComponent from "@/app/Admin/components/TableComponent";
import { useModal } from "@/hooks/useModal";
import AddMoneyModal from "./components/AddMoneyModal";
import ModalWrapper from "@/components/ModalWrapper";

const Wallet = () => {
	const { data } = useGetWallet();
    const {openModal} = useModal()
    const showAddMoneyModal = () => openModal('add-money',<ModalWrapper render={<AddMoneyModal/>}/>)

    // const walletTypeOptions = [
    //     {label : "Credit", value : 'credit'},
    //     {label : "Debit", value : 'debit'},
    //     {label : "All", value : 'all'},
    // ]
    const walletTimePeriodOptions = [
        {label : 'Today', value : '1'},
        {label : 'Last Week', value : '7'},
        {label : 'Last Month', value : '30'},
        {label : 'Last Year', value : '365'},
        {label : 'All', value : '0'},
    ]
    const walletSortByOptions = [		{
			label: "Date - asc",
			value: "Date -asc",
			CONST: { sort: "createdAt", order: "asc" },
		},
		{
			label: "Date - desc",
			value: "Date -desc",
			CONST: { sort: "createdAt", order: "desc" },
		},
		{
			label: "Amount - asc",
			value: "Amount -asc",
			CONST: { sort: "amount", order: "asc" },
		},
		{
			label: "Amount - desc",
			value: "amount -desc",
			CONST: { sort: "amount", order: "desc" },
		},

    ]

    const column = [
        {key : "type", label : "TYPE", render : (val)=>{
            if(val === 'credit') return (<div className="w-9 h-9 flex justify-center items-center rounded-full bg-green-500">C</div>)
            if(val === 'debit') return (<div className="w-9 h-9 flex justify-center items-center rounded-full bg-red-500">D</div>)
            if(val === 'refund') return (<div className="w-9 h-9 flex justify-center items-center rounded-full bg-amber-500">R</div>)
        }},
        {key : "_id", label : "TYPE",},
        {key : "amount", label : "Amount",},
        {key : "order_id", label : "Order Id",},
        {key : "", label : "METHODS" , render: (val ,row)=>{
            if(row.razorpay_order_id) return (<>Razorpay</>)
            else return (<>Wallet</>)

        }},
        // {key : "/", label : "Order Id",},

        {key : "status", label : "Status",},

    ]

    return (
		<>
			<div className="pb-5 mb-2 flex justify-between items-center text-2xl font-semibold border-b-2">
				<span>My Wallet</span>
				<button className="text-lg font-normal px-5 py-3 bg-blue-600 rounded text-white" onClick={showAddMoneyModal}>Add Money</button>
			</div>
			<div className="flex justify-between">
				{/* // Balance Card  */}
				<div className="bg-gray-100 gap-3 font-semibold flex flex-col items-between text-nowrap ps-10 pe-20 py-8 border-gray-400 border-2 rounded w-max">
					Available Balance <br />
					<span className="block text-4xl text-green-600 font-bold"> ${data?.data?.wallet?.balance.toFixed(2)}</span>
				</div>
			</div>
			<div className="w-full my-10 mx-auto shadow-xl ring ring-gray-200 rounded-xl px-5 py-5">
				{/* <p>Search Transactions</p>
				<div className="flex gap-2">
					<input type="text" placeholder="Search By TXN ID..." className="ring ring-gray-400 rounded px-5 py-1" />
                    <Dropdown label={'Filter By Type'} options={walletTypeOptions} />
                    <Dropdown label={'Time Period'} options={walletTimePeriodOptions} />
                    <Dropdown label={'Sort By'} options={walletSortByOptions} />
				</div> */}

                <TableComponent data={data?.data?.transactions} column={column}/>
			</div>
		</>
	);
};
export default Wallet;
