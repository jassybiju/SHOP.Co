import React from "react";
import { useModal } from "../../../../../hooks/useModal";
import { Loader2 } from "lucide-react";
import { useGetCategory } from "../../../hooks/useCategoryManagement";

export default function ViewCategory({ id }) {
    const { closeModal } = useModal();

    const { data: category, status } = useGetCategory(id);
    if (status !== "success") {
        return <Loader2 className=" animate-spin " />;
    }
    return (
        <>
            <div className="bg-white rounded-xl shadow-xl w-1/2  p-10 px-[10%]  outline-1">
                <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2">
                    View Category{" "}
                </h2>

                <div>
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
                            value={category.data.name}
                            required
                            disabled
                            placeholder="Enter Brand name"
                            className="block w-full bg-gray-50 border border-gray-300 rounded-lg p-3  text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                        />
                    </div>
                    <div className="mb-8">
                        <label
                            htmlFor="Brand-description"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Category Description
                        </label>

                        <textarea
                            id="Brand-description"
                            name="description"
                            disabled
                            value={category.data.description}
                            placeholder="Write a short description"
                            className="block w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y transition min-h-[80px]"
                        />
                    </div>
  <div className="mb-6">
                        <label
                            htmlFor="Brand-name"
                            className="block text-gray-700 font-medium mb-2"
                        >
                            Category Discount
                        </label>
                        <input
                            type="text"
                            id="Brand-name"
                            name="name"
                            value={category.data.discount}
                            required
                            disabled
                            placeholder="Enter Brand name"
                            className="block w-full bg-gray-50 border border-gray-300 rounded-lg p-3  text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={()=>closeModal('view-category')}
                            className="px-6 py-3 bg-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
