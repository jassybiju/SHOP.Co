import { useForm } from "react-hook-form";
import { useModal } from "../../../../../hooks/useModal";
import { useEffect } from "react";
import {
    useEditCategory,
    useGetCategory,
} from "../../../hooks/useCategoryManagement";
import toast from "react-hot-toast";
import useConfirmationModal from "../../../hooks/useConfirmationModal";
import { Loader2 } from "lucide-react";
import Loader from "@/components/Loader";
// import ConfirmationModal from "../../../components/ConfirmationModal";

const EditCategory = ({ id }) => {
    console.log(id);
    const { data: category, status } = useGetCategory(id);
    const {
        register,
        handleSubmit,
        formState: { errors: formError },
        reset,
        trigger,
    } = useForm({ defaultValues: { name: "", description: "" } });
    const { mutate: EditCategory, status: editingStatus } = useEditCategory();
    const { closeModal } = useModal();
    const confirmation = useConfirmationModal();
    useEffect(() => {
        reset({
            name: category?.data.name,
            description: category?.data.description,
            discount: category?.data.discount,
        });
    }, [category, reset]);

    const onSubmit = (data) => {
        console.log(data);
        EditCategory(
            { id, data },
            {
                onError: (res) => {
                    console.log(res);
                    toast.error(res.response.data.message);
                },
                onSuccess: (res) => {
                    console.log(res);
                    toast.success(res.message);
                    closeModal("edit-category");
                },
            }
        );
    };

    // const ShowConfirmationModal = ()=>{
    //     setModalContent(<ConfirmationModal onConfirm={handleSubmit(onSubmit)}/>)
    //     setShowModal(true)
    // }

    if (status !== "success") {
        return <Loader/>;
    }
    return (
        <>
            <div className="bg-white rounded-xl shadow-xl w-1/2  p-10 px-[10%]  outline-1">
                <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2">
                    Edit Category
                </h2>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        trigger().then(
                            (x) => x && confirmation(handleSubmit(onSubmit))
                        );
                    }}
                    noValidate
                >
                    <div className="mb-6">
                        <label
                            htmlFor="Brand-name"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Category Name
                        </label>
                        <input
                            type="text"
                            id="Brand-name"
                            name="name"
                            {...register("name", {
                                required: "Category name is required ",
                            })}
                            required
                            placeholder="Enter Brand name"
                            className="block w-full bg-gray-50 border border-gray-300 rounded-lg p-3  text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                        />
                        <p className="text-red-500">
                            {formError?.name && formError?.name.message}
                        </p>
                    </div>
                    <div className="mb-8">
                        <label
                            htmlFor="Brand-description"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Category Description
                        </label>
                        <textarea
                            id="category-description"
                            name="description"
                            {...register("description", {
                                required: "Category descritpion is required ",
                            })}
                            placeholder="Write a short description"
                            className="block w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y transition min-h-[80px]"
                        />
                        <p className="text-red-500">
                            {formError.description &&
                                formError?.description.message}
                        </p>
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="Brand-name"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Discount
                        </label>
                        <input
                            type="text"
                            id="Brand-name"
                            name="name"
                            {...register("discount", {
                                required: "Category Discount is required ",
                                min : {
                                    value : 0,message : "Minimum Value should be 0"
                                }, max : {
                                    value : 100,message : "Maximum Value should be 100"
                                }
                            })}
                            required
                            placeholder="Enter Discount"
                            className="block w-full bg-gray-50 border border-gray-300 rounded-lg p-3  text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                        />
                        <p className="text-red-500">
                            {formError?.discount && formError?.discount.message}
                        </p>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            disabled={editingStatus === "pending"}
                            onClick={() => closeModal("edit-category")}
                            className="px-6 py-3 bg-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-400 transition disabled:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={editingStatus === "pending"}
                            type="submit"
                            className="px-6 py-3 bg-indigo-600 rounded-lg font-semibold text-white hover:bg-indigo-700 transition disabled:bg-indigo-700"
                        >
                            {editingStatus === "pending" ? (
                                <div className="flex gap-2">
                 -                   <Loader2 className="animate-spin" /> Editing
                                    Category
                                </div>
                            ) : (
                                "Edit Category"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};
export default EditCategory;
