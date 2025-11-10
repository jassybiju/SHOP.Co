import React from "react";
import { useModal } from "../../../../../hooks/useModal";
import { useForm } from "react-hook-form";
import { useAddBrand } from "../../../hooks/useBrandManagement";
import { toast } from "react-hot-toast";
import { ImageComponent } from "../../product_management/components/ImageComponent";
import useConfirmationModal from "../../../hooks/useConfirmationModal";
import { Loader2 } from "lucide-react";
export default function AddBrand() {
    const { closeModal } = useModal();

    const {
        register,
        handleSubmit,
        setError,
        setValue,
        trigger,
        formState: { errors: formError },
    } = useForm();
    const { mutate: addBrand , status } = useAddBrand();
    const confirmation = useConfirmationModal();
    const onSubmit = (data) => {
        console.log(data);
        addBrand(data, {
            onSuccess: (data) => {
                console.log(data);
                toast.success(data.message);
                closeModal("add-brand");
            },
            onError: (error) => {
                toast.error(error.response.data.message);
            },
        });
    };

    return (
        <>
            <div className="bg-white rounded-xl shadow-xl w-1/2 my-10  p-10 px-[10%]  outline-1">
                <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2">
                    Add Brand
                </h2>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        trigger().then(
                            (x) =>
                                x && confirmation(handleSubmit(onSubmit))
                        );
                    }}
                    noValidate
                >
                    <p className="text-red-500">
                        {formError?.form && formError?.form.message}
                    </p>
                    <div className="h-50">
                        <ImageComponent
                            register={register}
                            name="image"
                            setValue={setValue}
                        />
                    </div>{" "}
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
                            disabled={status == 'pending'}
                            onClick={() => closeModal("add-brand")}
                            className="px-6 py-3 bg-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-400 transition disabled:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={status === 'pending'}
                            className="px-6 py-3 bg-indigo-600 rounded-lg font-semibold text-white hover:bg-indigo-700 transition disabled:bg-indigo-700"
                        >
                            {status === 'pending' ? <div className="flex gap-2"><Loader2 className="animate-spin"/> Adding Brand</div> :'Add Brand' }
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
