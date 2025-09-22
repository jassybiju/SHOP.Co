import { useForm } from "react-hook-form";
import { useModal } from "../../../hooks/ModalContext";
import { useEffect } from "react";
import { useEditCategory, useGetCategory } from "../../../hooks/useCategoryManagement";

const EditCategory = ({ id }) => {
    console.log(id);
    const { data: brands, status } = useGetCategory(id);
    const {
        register,
        handleSubmit,
        formState: { errors: formError },
        reset,
    } = useForm({ defaultValues: { name: "", description: "" } });
    const {mutate : EditCategory} = useEditCategory()
    const { setShowModal } = useModal();
    useEffect(() => {
        reset({
            name: brands?.data.name,
            description: brands?.data.description,
        });
    }, [brands, reset]);


    const onSubmit = (data) => {
        console.log(data);
        EditCategory({id, data})
    };
    
    if (status !== "success") {
        return "Loading...";
    }
    return (
        <>
            <div className="bg-white rounded-xl shadow-xl w-full  p-10 px-[10%]  outline-1">
                <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2">
                    Edit Brand
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mb-6">
                        <label
                            htmlFor="Brand-name"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Brand Name
                        </label>
                        <input
                            type="text"
                            id="Brand-name"
                            name="name"
                            {...register("name", {
                                required: "Brand name is required ",
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
                            Brand Description
                        </label>
                        <textarea
                            id="Brand-description"
                            name="description"
                            {...register("description", {
                                required: "Brand descritpion is required ",
                            })}
                            placeholder="Write a short description"
                            className="block w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y transition min-h-[80px]"
                        />
                        <p className="text-red-500">
                            {formError.description &&
                                formError?.description.message}
                        </p>
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="px-6 py-3 bg-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-indigo-600 rounded-lg font-semibold text-white hover:bg-indigo-700 transition"
                        >
                            Edit Brand
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};
export default EditCategory;
