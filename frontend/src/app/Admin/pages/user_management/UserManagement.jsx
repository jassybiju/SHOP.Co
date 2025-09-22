import { Loader, User } from "lucide-react";
import Header from "../../components/Header";
import IconCards from "../../components/IconCards";
import Search from "../../components/Search";
import Dropdown from "../../components/Dropdown";
import TableComponent from "../../components/TableComponent";
import { useGetAllUsers, useToggleUserActiveStatus } from "../../hooks/useUserManagement";
import UserStateComponent from "./ui/UserStateComponent";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const UserManagement = () => {
    const limit = 2;
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
            key: "active",
            render: (val) => <UserStateComponent state={val} />,
        },
        {
            label: "ACTIONS",
            render: (_, row) => (
                <>
                    <button
                        className="bg-violet-600 hover:bg-violet-700 text-white py-1 px-4 rounded font-semibold text-xs"
                        onClick={() => navigate(row._id)}
                    >
                        VIEW
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded font-semibold text-xs" onClick={()=>toggleActiveUser(row._id)}>
                        BLOCK
                    </button>
                </>
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
                        options={SortOptions}
                        value={Object.keys(SORT_OPTION_CONSTANT).find(
                            (key) => SORT_OPTION_CONSTANT[key] === params.sort
                        )}
                        onChange={(e) =>
                            setParams((state) => ({
                                ...state,
                                ...SORT_OPTION_CONSTANT[e.target.value],
                            }))
                        }
                    />
                    <Dropdown
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
                    type="submit"
                    className="hover:text-gray-700 h-auto px-10  rounded  text-xl  bg-violet-700 hover:bg-violet-500 text-white"
                >
                    Export
                </button>
            </div>
            <TableComponent
                data={users.data}
                column={column}
                pages={Math.ceil(users.total_users/users.limit)}
                page={users.page}
                onPageChange={(x)=>setParams(state => ({...state, page : x}))}
            />
        </div>
    );
};
export default UserManagement;
