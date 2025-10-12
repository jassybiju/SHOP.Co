import { useState } from "react";
import Header from "../../components/Header";
import { useGetAllBrands } from "../../hooks/useBrandManagement";
import Dropdown from "../../components/Dropdown";
import TableComponent from "../../components/TableComponent";
import Search from "../../components/Search";
import { useModal } from "../../../../hooks/useModal";
import AddBrand from "./components/AddBrand";
import ViewBrand from "./components/ViewBrand";
import EditBrand from "./components/EditBrand";
import ModalWrapper from "../../../../components/ModalWrapper";

const BrandMangement = () => {
    // ! TODO  edit brand
    const [params, setParams] = useState({
        limit: "5",
        page: "",
        search: "",
        filter: "",
    });
    const { data: brands, status } = useGetAllBrands(params);
    const { setShowModal, setModalContent, openModal } = useModal();
    const showViewBrandModal = (id) => {
        openModal(
            "view-brand",
            <ModalWrapper render={<ViewBrand id={id} />} />
        );
    };
    const showEditBrandModal = (id) => {
        openModal(
            "edit-brand",
            <ModalWrapper render={<EditBrand id={id} />} />
        );
    };
    const showAddBrandModal = () => {
        openModal("add-brand", <ModalWrapper render={<AddBrand />} />);
    };

    if (status !== "success") {
        return "Loading";
    }

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
                        onClick={() => showViewBrandModal(val)}
                    >
                        VIEW
                    </button>
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded font-semibold text-xs"
                        onClick={() => showEditBrandModal(val)}
                    >
                        Edit
                    </button>
                </div>
            ),
        },
    ];
    const sortOptions = [
        {
            label: "Created At - asc",
            value: "createdAt -asc",
            CONST: { sort: "createdAt", order: "asc" },
        },
        {
            label: "Created At - desc",
            value: "createdAt -desc",
            CONST: { sort: "createdAt", order: "desc" },
        },
        {
            label: "Name - asc",
            value: "name -asc",
            CONST: { sort: "name", order: "asc" },
        },
        {
            label: "Name - desc",
            value: "name -desc",
            CONST: { sort: "name", order: "desc" },
        },
    ];

    return (
        <div>
            <Header heading="Brand Mangement" />
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
                        onChange={(e) =>
                            setParams((state) => ({
                                ...state,
                                ...sortOptions.find(
                                    (x) => x.value === e.target.value
                                ).CONST,
                            }))
                        }
                    />
                </div>
                <button
                    type="submit"
                    className="hover:text-gray-700 h-auto flex  rounded px-10 p-2  gap-4 text-xl items-center bg-violet-700 hover:bg-violet-500 text-white"
                    onClick={showAddBrandModal}
                >
                    Add Brand
                </button>
            </div>
            <TableComponent
                data={brands.data}
                column={column}
                pages={brands.pages}
                page={brands.page}
                onPageChange={(x) =>
                    setParams((state) => ({ ...state, page: x }))
                }
            />
        </div>
    );
};
export default BrandMangement;
