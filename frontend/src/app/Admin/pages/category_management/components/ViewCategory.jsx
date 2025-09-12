import React, { useRef } from "react";
import { useModal } from "../../../hooks/ModalContext";
import { useGetCategory } from "../../../hooks/useCategoryManagement";
import { Loader2 } from "lucide-react";

export default function ViewCategory({id}) {
    const { setShowModal } = useModal();

   const {data : category, status} = useGetCategory(id)
   console.log(status)
   if(status !== 'success'){
    return <Loader2/>
   }
    return (
        <>
            <div className="bg-white rounded-xl shadow-xl w-full  p-10 px-[10%]  outline-1">
                <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2">
                    Add Category
                </h2>

                <div >
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
                            value={category.data.name}
                            required
                            placeholder="Enter Category name"
                            className="block w-full bg-gray-50 border border-gray-300 rounded-lg p-3  text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                        />
                       
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
                           value ={category.data.description}
                            placeholder="Write a short description"
                            className="block w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y transition min-h-[80px]"
                        />
                       
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
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
