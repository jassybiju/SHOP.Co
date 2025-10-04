import { Loader, User } from "lucide-react";
import Header from "../../components/Header";
import IconCards from "../../components/IconCards";
import Search from "../../components/Search";
import Dropdown from "../../components/Dropdown";
import TableComponent from "../../components/TableComponent";
import { useGetAllUsers, useToggleUserActiveStatus } from "../../hooks/useUserManagement";
import UserStateComponent from "./ui/UserStateComponent";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import useConfirmationModal from "../../hooks/useConfirmationModal";

const UserManagement = () => {
    const limit = 10;
    const [params, setParams] = useState({
        search: "",
        sort: "created at - asc",
        filter: "AllUsers",
        page: 1,
    });

    const {
        data: users,
        isLoading,
        status,
        isFetching,
    } = useGetAllUsers({ ...params, limit });

    const {mutate : toggleActiveUser } = useToggleUserActiveStatus()
    
    const navigate = useNavigate()

    useEffect(()=> {
        if(users?.pages < params?.page){
            setParams((state)=> ({...state, page : users.pages}))
        }
        console.log(users?.page , params?.page)
    },[params,   users])

    const showConfirmation = useConfirmationModal()

    const column = [
        {
            label: "Users",
            key: "",
            render: (value, row) => (
                <>
                    <img src={row.avatar} alt={row.avatar} /> {row.first_name}{" "}
                    {row.last_name}
                </>
            ),
        },
        { label: "Email", key: "email" },
        { label: "ID", key: "_id" },
        {
            label: "User state",
            key: "role",
            render : (val) => <p className="capitalize">{val}</p>
        },
        {
            label: "ACTIONS",
            render: (_, row) => (
                <div className="flex gap-4 justify-center mx-auto">
                    <button
                        className="bg-violet-600 hover:bg-violet-700 text-white py-1 px-4 rounded font-semibold text-xs"
                        onClick={() => navigate(row._id)}
                    >
                        VIEW
                    </button>
                        <button className={` text-white py-1 px-4 rounded font-semibold text-xs ${row.active ? 'bg-red-500 hover:bg-red-600' : 
                        "bg-green-500 hover:bg-green-600"}`} onClick={()=>showConfirmation(()=>toggleActiveUser(row._id), `${row.active? "block" : 'unblock'} user `)}>
                       {row.active ? "Block " : "Unblock"} 
                    </button>
                </div>
            ),
        },
    ];
    const filterOptions = [
        { label: "all Users", value: "AllUsers" },
        { label: "Active Users ", value: "ActiveUsers" },
        { label: "Inactive Users ", value: "InActiveUsers" },
        { label: "Admin", value: "Admin" },
        { label: "User", value: "User" },
    ];
    const SortOptions = [
        {
            label: "created at - asc",
            value: "created at - asc",
        },{
            label: "created at - desc",
            value: "created at - desc",
        },
        { label: "name - asc", value: "name - asc" },
        { label: "name - desc", value: "name - desc" },
    ];
    const SORT_OPTION_CONSTANT = {
        "created at - asc": { sort: "createdAt", order: "asc" },
        "created at - desc": { sort: "createdAt", order: "desc" },
        "name - asc": { sort: "first_name", order: "asc" },
        "name - desc": { sort: "first_name", order: "desc" },
    };

    

    console.log(users, params);

    // loader on data loading
    if (isLoading) {
        return <Loader />;
    }

    return (
        <div>
            <Header heading="User Management" />
            <div className="flex gap-10 m-10">
                <IconCards
                    icon={<User size={35} />}
                    value={users.total_users}
                    label={"total users"}
                />
                <IconCards
                    icon={<User size={35} />}
                    value={users.blocked_users}
                    label={"Blocked users"}
                />
            </div>
            <div className="flex justify-between mx-6">
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
                        label={"Sort By"}
                        options={SortOptions}
                        // value={Object.keys(SORT_OPTION_CONSTANT).find(
                        //     (key) => SORT_OPTION_CONSTANT[key] === params.sort
                        // )}
                        onChange={(e) =>
                            setParams((state) => ({
                                ...state,
                                ...SORT_OPTION_CONSTANT[e.target.value],
                            }))
                        }
                    />
                    <Dropdown
                        label='Filter By'
                        options={filterOptions}
                        onChange={(e) =>
                            setParams((state) => ({
                                ...state,
                                filter: e.target.value,
                            }))
                        }
                    />
                </div>
                <button 

                    onClick={showConfirmation}
                    className="hover:text-gray-700 h-auto px-10  rounded  text-xl  bg-violet-700 hover:bg-violet-500 text-white"
                >
                    Export
                </button>
            </div>
            <TableComponent
                data={users.data}
                column={column}
                pages={users.pages}
                page={users.page}
            
                onPageChange={(x)=>setParams(state => ({...state, page : x}))}
            />
        </div>
    );
};
export default UserManagement;
