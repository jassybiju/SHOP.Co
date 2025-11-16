import Dropdown from "../../../../components/Dropdown";
import Header from "../../components/Header";
import Search from "../../components/Search";
import TableComponent from "../../components/TableComponent";
import { useGetAllCategories, useToggleCategoryStatus } from "../../hooks/useCategoryManagement";
import { useState } from "react";
import AddCategory from "./components/AddCategory";
import { useModal } from "../../../../hooks/useModal";
import ViewCategory from "../category_management/components/ViewCategory";
import EditCategory from "../category_management/components/EditCategory";
import ModalWrapper from "../../../../components/ModalWrapper";
import useConfirmationModal from "../../hooks/useConfirmationModal";
import toast from "react-hot-toast";
import ToggleBtn from "../product_management/ui/ToggleBtn";
import Loader from "@/components/Loader";

const CategoryMangement = () => {
	const [params, setParams] = useState({
		limit: "5",
		page: "",
		search: "",
		filter: "",
	});
	const { openModal } = useModal();
	const { data: categories, status, isLoading } = useGetAllCategories(params);
	const { mutate: toggleCategory } = useToggleCategoryStatus();
	const showConfirmation = useConfirmationModal();
	if (status == "loading" || isLoading) {
		return <Loader/>;
	}
	console.log(categories);
	const showAddCategoryModal = () => {
		openModal("add-category", <ModalWrapper render={<AddCategory />} />);
	};
	const showViewCategoryModal = (id) => {
		openModal("view-category", <ModalWrapper render={<ViewCategory id={id} />} />);
	};
	const showEditCategoryModal = (id) => {
		openModal("edit-category", <ModalWrapper render={<EditCategory id={id} />} />);
	};

	console.log(params);
	const column = [
		{
			label: "Sl No",
			key: "_id",
			render: (_, row, data) => data.indexOf(row) + 1,
		},
		{ label: "Name", key: "name" },
		{ label: "Description", key: "description" },
		{ label: "Discount", key: "discount" },
		{
			label: "is_active",
			key: "is_active",
			render: (val, row) => (
				<ToggleBtn
					state={val}
					onClick={() =>
						showConfirmation(
							() =>
								toggleCategory(row._id, {
									onSuccess: (res) => toast.success(res.message),
								}),
							`${val ? "block" : "unblock"} this product `
						)
					}
				/>
			),
		},
		{
			label: "Actions",
			key: "_id",
			render: (val) => (
				<div className="flex gap-5">
					{" "}
					<button
						className="bg-violet-600 hover:bg-violet-700 text-white py-1 px-4 rounded font-semibold text-xs"
						onClick={() => showViewCategoryModal(val)}
					>
						VIEW
					</button>
					<button
						className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded font-semibold text-xs"
						onClick={() => showEditCategoryModal(val)}
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
			<Header heading="Category Mangement" />
			<div className=" flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-6 mx-3 sm:mx-6 flex-wrap">
				<div className="flex flex-col sm:flex-row gap-3 sm:gap-5 w-full sm:w-[60%]">
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
								...sortOptions.find((x) => x.value === e.target.value).CONST,
							}))
						}
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
					className="w-full sm:w-auto hover:text-gray-700 h-auto flex justify-center rounded px-6 sm:px-10 py-2 gap-3 text-base sm:text-xl items-center bg-violet-700 hover:bg-violet-500 text-white"
					onClick={showAddCategoryModal}
				>
					Add Category
				</button>
			</div>
			<TableComponent
				data={categories.data}
				column={column}
				pages={categories.pages}
				page={categories.page}
				onPageChange={(x) => setParams((state) => ({ ...state, page: x }))}
			/>
		</div>
	);
};
export default CategoryMangement;
