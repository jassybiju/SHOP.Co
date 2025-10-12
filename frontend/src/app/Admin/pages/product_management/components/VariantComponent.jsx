import { Trash2 } from "lucide-react";
import { useModal } from "../../../../../hooks/useModal";
import EditVariant from "./EditVariant";
import AddVariant from "./AddVariant";
import ModalWrapper from "../../../../../components/ModalWrapper";

const VariantComponent = ({
    value,
    onAddVariant,
    onEditVariant,
    field,
    remove,
    readonly,
    index,
}) => {
    const { openModal } = useModal();

    const showAddVariantModal = () => {
        openModal(
            "add-variant",
            <ModalWrapper render={<AddVariant onAddVariant={onAddVariant} />} />
        );
    };
    const showEditVariantModal = () => {
        openModal(
            "edit-variant",
            <ModalWrapper
                render={
                    <EditVariant onEditVariant={onEditVariant} value={field} />
                }
            />
        );
    };

    return (
        <div
            className={`h-[100px] lg:h-[120px] w-[24%] bg-gray-50 text-xl md:text-2xl rounded border-2  border-gray-400 flex flex-col justify-evenly  relative ${
                !readonly && "hover:bg-gray-200 "
            }`}
        >
            {value ? (
                <div className=" ">
                    {!readonly && (
                        <div
                            className="bg-red-500 p-2 w-max rounded-full absolute -top-5 -right-5"
                            onClick={() => remove(index)}
                        >
                            <Trash2 color={"white"} />
                        </div>
                    )}
                    <div
                        onClick={showEditVariantModal}
                        className="pl-3 lg:pl-10"
                    >
                        <div className="flex items-center  gap-3 ">
                            Color :{" "}
                            <span
                                className={`  w-5 h-5 inline-block rounded-full `}
                                style={{ backgroundColor: value.color }}
                            ></span>
                        </div>
                        <div className="flex items-center   gap-3">
                            Size :{" "}
                            <span
                                className={`font-bold text-[${value.color}]`}
                                style={{ color: value.color }}
                            >
                                {value.size}
                            </span>
                        </div>
                        <div className="flex items-center   gap-3">
                            Stock :{" "}
                            <span
                                className={`font-bold text-[${value.color}]`}
                                style={{ color: value.color }}
                            >
                                {value.stock}
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className="flex items-center justify-center"
                    onClick={showAddVariantModal}
                >
                    +
                </div>
            )}
        </div>
    );
};

export default VariantComponent;
