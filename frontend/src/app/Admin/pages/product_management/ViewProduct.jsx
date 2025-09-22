import { ImageUp, Trash2 } from "lucide-react";
import Header from "../../components/Header";
import { useRef, useState } from "react";
import InputComponent from "../../components/InputComponent";
import Dropdown from "../../components/Dropdown";
import { useModal } from "../../hooks/ModalContext";
import AddVariant from "./components/AddVariant";
import { useGetAllBrands } from "../../hooks/useBrandManagement";
import { useGetAllCategories } from "../../hooks/useCategoryManagement";
import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import { useAddProduct, useGetProduct } from "../../hooks/useProductManagement";
import { useParams } from "react-router";
const ViewProduct = () => {
    // const [variants, setVariants] = useState([{ color: "#000", size: "M" }]);
    const { id } = useParams();
    const { data: product, status } = useGetProduct(id);
    console.log(product);
    const { data: { data: brands } = { data: [] } } = useGetAllBrands({
        limit: 100,
    });
    const { data: { data: categories } = { data: [] } } = useGetAllCategories();

    if (status !== "success") return "Loading";

    return (
        <>
            <Header heading="View Product" goback />
            <form className="mr-3 m-0 md:m-5 flex flex-wrap">
                <div className="w-[100%] md:w-[50%] xl:w-[30%] h-90  md:mr-5">
                    <ImageGroupComponent
                        readonly
                        value={product.data.images.map((x) => x.url)}
                    />
                </div>
                <div className="w-[100%] md:w-[40%] xl:w-[65%] md:mt-5">
                    <InputComponent
                        label={"Product Name"}
                        value={product.data.name}
                    />
                    <InputComponent
                        label={"Product Small Description"}
                        value={product.data.small_description}
                    />

                    <div className="flex w-full gap-2">
                        <InputComponent
                        readonly
                            label={"Price"}
                            value={product.data.price}
                        />
                        <InputComponent
                            label={"Discount"}
                            readonly
                            value={product.data.discount}
                        />
                    </div>
                </div>
                <div className="w-[100%] md:w-[100%] xl:w-[100%] md:my-5">
                    <div className="flex w-full gap-2">
                        <InputComponent
                            select
                            label={"Brand"}
                            readonly
                            options={brands.map((x) => ({
                                label: x.name,
                                value: x._id,
                            }))}
                            value={product.data.brand_id}
                        />
                        <InputComponent
                            select
                            readonly
                            label={"Category"}
                            options={categories.map((x) => ({
                                label: x.name,
                                value: x._id,
                            }))}
                            value={product.data.category_id}
                        />
                    </div>
                    <InputComponent
                        textarea
                        label={"Description"}
                        value={product.data.description}
                    />
                    <div className="bg-white p-5 shadow-xl rounded-2xl">
                        <h1 className="font-bold ">Variant</h1>
                        <div className="flex w-full  gap-5 flex-wrap ">
                            {product.data.variants.map((field) => (
                                <VariantComponent
                                    readonly
                                    key={field.id}
                                    field={field}
                                    value={{
                                        color: field.color,
                                        size: field.size,
                                    }}
                                />
                            ))}

                            {/* <VariantComponent
                                onAddVariant={(val) => append(val)}
                            /> */}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-indigo-600 rounded-lg font-semibold text-white hover:bg-indigo-700 transition"
                        >
                            Add Product
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};
export default ViewProduct;

const ImageGroupComponent = ({ register, error, value, readonly = false }) => {
    return (
        <div className="grid grid-cols-3 grid-rows-3 w-[100%] h-[100%] gap-3 m-1 relative">
            <div className="">
                <ImageComponent
                    value={value[1]}
                    register={register}
                    readonly={readonly}
                    name={"images[1]"}
                    registerObj={{ required: "Image is required" }}
                />
            </div>
            <div className="row-span-3 col-span-2">
                <ImageComponent
                    readonly={readonly}
                    value={value[0]}
                    register={register}
                    name={"images[0]"}
                    registerObj={{ required: "Main Image is required" }}
                />
            </div>
            <div className=" ">
                <ImageComponent
                    readonly={readonly}
                    value={value[2]}
                    register={register}
                    name={"images[2]"}
                />
            </div>
            <div className="">
                <ImageComponent
                    readonly={readonly}
                    value={value[3]}
                    register={register}
                    name={"images[3]"}
                />
            </div>
            <h2 className="absolute -bottom-5 text-red-500">
                {error && error.filter((x) => x)[0]?.message}
            </h2>
        </div>
    );
};

const ImageComponent = ({
    name = "",
    register = () => ({}),
    registerObj,
    value = null,
    readonly,
}) => {
    const [preview, setPreview] = useState(value);
    const hiddenInputRef = useRef();
    const onUpload = () => hiddenInputRef.current.click();
    console.log(registerObj, name);
    const handleUploadFile = (e) => {
        const file = e.target.files[0];
        const urlImage = URL.createObjectURL(file);
        setPreview(urlImage);
    };

    const {
        ref: registerRef = () => {},
        onChange: registerOnChange = () => {},
        ...registerRest
    } = register(name, registerObj);

    return (
        <>
            <div
                className="rounded-xl w-full h-full bg-gray-300 flex justify-center items-center flex-col"
                onClick={onUpload}
            >
                {preview ? (
                    <img src={preview} alt="" />
                ) : (
                    <>
                        <ImageUp />
                        Upload Your image
                    </>
                )}
            </div>
            <input
                {...registerRest}
                disabled={readonly}
                
                type="file"
                className="hidden"
                ref={(e) => {
                    registerRef(e);
                    hiddenInputRef.current = e;
                }}
                onChange={(e) => {
                    handleUploadFile(e);
                    registerOnChange(e);
                }}
            />
        </>
    );
};

const VariantComponent = ({ value, onAddVariant, field, remove, readonly }) => {
    const { setShowModal, setModalContent } = useModal();

    const showAddVariantModal = () => {
        setModalContent(<AddVariant onAddVariant={onAddVariant} />);
        setShowModal(true);
    };

    return (
        <div
            className={`h-[100px] lg:h-[120px] w-[24%] bg-gray-50 text-xl md:text-2xl rounded border-2  border-gray-400 flex flex-col justify-evenly  relative ${
                !readonly && "hover:bg-gray-200 "
            }`}
        >
            {value ? (
                <div className="pl-3 lg:pl-10 ">
                    {!readonly && (
                        <div
                            className="bg-red-500 p-2 w-max rounded-full absolute -top-5 -right-5"
                            onClick={() => remove(field.id)}
                        >
                            <Trash2 color={"white"} />
                        </div>
                    )}
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
