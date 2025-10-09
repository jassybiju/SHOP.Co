import { useForm } from "react-hook-form";
import { useModal } from "../../../../../hooks/useModal";
import InputComponent from "../../../../../components/InputComponent";
import { SIZE_TYPES } from "../../../../../utils/CONSTANTS";
import { toast } from "react-hot-toast";

const EditVariant = ({ onEditVariant, value }) => {
    const {
        register,
        handleSubmit,
        formState: { errors: formError },
    } = useForm({ defaultValues: value });
    console.log(value);
    const { closeModal } = useModal();
    const onSubmit = (data) => {
        console.log(data);

        closeModal("edit-variant");
        toast.success("Variant Edited Succesfully");
        onEditVariant(data);
    };

    return (
        <div
            className="bg-white rounded-xl shadow-xl w-1/2  p-10 px-[10%]  outline-1"
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-2">
                Edit Variant
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <p className="text-red-500">
                    {formError?.form && formError?.form.message}
                </p>
                <InputComponent
                    label={"Size"}
                    select
                    options={SIZE_TYPES}
                    register={register("size", {
                        required: "Size is required",
                    })}
                    error={formError.size}
                />

                <InputComponent
                    colorPicker
                    label={"Color"}
                    register={register("color", {
                        required: "Color is required",
                    })}
                    error={formError.color}
                />

                <InputComponent
                    label={"Stock"}
                    register={register("stock", {
                        required: "Stock is requried",
                        min: { value: 0, message: "Min value is 0" },
                    })}
                    error={formError.stock}
                />

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => closeModal("edit-variant")}
                        className="px-6 py-3 bg-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-400 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-3 bg-indigo-600 rounded-lg font-semibold text-white hover:bg-indigo-700 transition"
                    >
                        Edit Variant
                    </button>
                </div>
            </form>
        </div>
    );
};
export default EditVariant;
