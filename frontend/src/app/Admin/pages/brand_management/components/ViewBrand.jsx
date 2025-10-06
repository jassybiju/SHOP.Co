import React, { useRef } from "react";
import { useModal } from "../../../../../hooks/useModal";
import { Loader2 } from "lucide-react";
import ImageInput from "../ui/ImageInput";
import { useGetBrand } from "../../../hooks/useBrandManagement";
import { ImageComponent } from "../../product_management/components/ImageComponent";

export default function ViewBrand({ id }) {
    const { closeModal } = useModal();

    const { data: brand, status } = useGetBrand(id);
    console.log(status);
    console.log(brand)
    if (status !== "success") {
        return <Loader2 />;
    }
    return (
        <>
            <div className="bg-white rounded-xl shadow-xl w-1/2 h-[98vh]  m-10 p-10 px-[10%]  outline-1">
                <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2">
                    View Brand
                </h2>

                <div>
                     <ImageComponent previewImg={brand.data.image} readonly size={50}  />
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
                            value={brand.data.name}
                            required
                            placeholder="Enter Brand name"
                            className="block w-full bg-gray-50 border border-gray-300 rounded-lg p-3  text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                        />
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
                            value={brand.data.description}
                            placeholder="Write a short description"
                            className="block w-full bg-gray-50 border border-gray-300 rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-y transition min-h-[80px]"
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={()=>closeModal('view-brand')}
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
