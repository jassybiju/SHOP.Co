import { useNavigate } from "react-router";
import Dropdown from "../../components/Dropdown";
import Header from "../../components/Header";
import Search from "../../components/Search";
import TableComponent from "../../components/TableComponent";
import { useGetAllCategories } from "../../hooks/useCategoryManagement";
import { useState } from "react";
import AddCategory from "../brand_management/components/AddBrand";
import { useModal } from "../../hooks/ModalContext";
import ViewCategory from "./components/ViewCategory";
import EditCategory from "./components/EditCategory";

const CategoryMangement = () => {
    const [params, setParams] = useState({ limit: "5", page: "", search: "", filter: "" })
    const {setShowModal , setModalContent} = useModal()
    const {
        data: categories,
        status,
        isLoading,
    } = useGetAllCategories(params);
    const navigate = useNavigate();
    if (status == "loading" || isLoading) {
        return "Loading";
    }

    const showAddCategoryModal = () => {
        setModalContent(<AddCategory/>)
        setShowModal(true)
    }
    const showViewCategoryModal = (id) => {
        setModalContent(<ViewCategory id={id}/>)
        setShowModal(true)
    }
     const showEditCategoryModal = (id) => {
        setModalContent(<EditCategory id={id}/>)
        setShowModal(true)
    }

    console.log(params);
    const column = [
        {
            label: "Sl No",
            key: "_id",
            render: (_, row, data) => data.indexOf(row) + 1,
        },
        { label: "Name", key: "name" },
        { label: "Description", key: "description" },
        {
            label: "Actions",
            key: "_id",
            render: (val) => (
                <div className="flex gap-5">
                    {" "}
                    <button
                        className="bg-violet-600 hover:bg-violet-700 text-white py-1 px-4 rounded font-semibold text-xs"
                        onClick={()=>showViewCategoryModal(val)}
                    >
                        VIEW
                    </button>
                    <button className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded font-semibold text-xs" onClick={()=>showEditCategoryModal(val)}>
                        Edit
                    </button>
                </div>
            ),
        },
    ];

    const sortOptions = [
        {label : 'Created At - asc' , value : 'createdAt -asc' , CONST : {sort : 'createdAt', order : 'asc'}},
        {label : 'Created At - desc' , value : 'createdAt -desc' , CONST : {sort : 'createdAt', order : 'desc'}},
        {label : 'Name - asc' , value : 'name -asc' , CONST : {sort : 'name', order : 'asc'}},
        {label : 'Name - desc' , value : 'name -desc' , CONST : {sort : 'name', order : 'desc'}}
    ]

    return (
        <div>
            <Header heading="Category Mangement" />
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
                        label="Sort by"
                        options={sortOptions}
                        onChange={(e) => setParams((state)=>({...state,...sortOptions.find(x=>x.value===e.target.value).CONST }))}
                        // options={SortOptions}
                        // value={Object.keys(SORT_OPTION_CONSTANT).find(
                        //     (key) => SORT_OPTION_CONSTANT[key] === params.sort
                        // )}
                        // onChange={(e) =>
                        //     setParams((state) => ({
                        //         ...state,
                        //         ...SORT_OPTION_CONSTANT[e.target.value],
                        //     }))
                        // }
                    />
                </div>
                <button
                    type="submit"
                    className="hover:text-gray-700 h-auto flex  rounded px-10 p-2  gap-4 text-xl items-center bg-violet-700 hover:bg-violet-500 text-white"
                    onClick={showAddCategoryModal}
                >
                    Add Product
                </button>
            </div>
            <TableComponent data={categories.data} column={column} pages={categories.pages} page={categories.page} onPageChange={(x) => setParams(state => ({...state,page : x }))}/>
        </div>
    );
};
export default CategoryMangement;
