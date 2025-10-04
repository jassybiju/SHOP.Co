import React, { useRef } from "react";
import { useModal } from "../../../../../hooks/useModal";
import { useForm } from "react-hook-form";
import { useAddCategory } from "../../../hooks/useCategoryManagement";
import { toast } from "react-hot-toast";
import { useState } from "react";
export default function AddCategory() {
    const { setShowModal } = useModal();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors: formError },
    } = useForm();
    const { mutate: addCategory } = useAddCategory();


    const onSubmit = (data) => {
        console.log(data);
        addCategory(data, {
            onSuccess: (data) => {
                console.log(data);
                toast.success(data.message);
                setShowModal(false);
            },
            onError: (error) => {
                
                toast.error(error.response.data.message);
            },
        });
    };
    
    return (
        <>
            <div className="bg-white rounded-xl shadow-xl w-full  p-10 px-[10%]  outline-1">
                <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2">
                    Add Category
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <p className="text-red-500">
                        {formError?.form && formError?.form.message}
                    </p>
                    <div className="mb-6">
                        <label
                            htmlFor="Category-name"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Category Name
                        </label>
                        <input
                            type="text"
                            id="Category-name"
                            name="name"
                            {...register("name", {
                                required: "Category name is required ",
                            })}
                            required
                            placeholder="Enter Category name"
                            className="block w-full bg-gray-50 border border-gray-300 rounded-lg p-3  text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                        />
                        <p className="text-red-500">
                            {formError?.name && formError?.name.message}
                        </p>
                    </div>
                    <div className="mb-8">
                        <label
                            htmlFor="Category-description"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Category Description
                        </label>
                        <textarea
                            id="Category-description"
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
                            Add Category
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
