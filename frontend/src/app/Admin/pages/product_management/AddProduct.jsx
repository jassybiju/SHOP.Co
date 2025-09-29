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
import {useAddProduct} from '../../hooks/useProductManagement'
import VariantComponent from "./components/VariantComponent";
import { ImageGroupComponent } from "./components/ImageGroupComponent";
const AddProduct = () => {
    // const [variants, setVariants] = useState([{ color: "#000", size: "M" }]);
    const {mutate : addProduct , status} = useAddProduct()
    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors },
    } = useForm();

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "variants",
        rules: {validate :(value)=> value.length> 0 || "At Least one variant is required"},
    });
    const { data: { data: brands } = { data: [] } } = useGetAllBrands({
        limit: 100,
    });
    const { data: { data: categories } = { data: [] } } = useGetAllCategories();



    const onSubmit = (data) => {
        toast.success('Saved')
        console.log(data.name);

        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('price', data.price)
        formData.append('discount', data.discount)
        formData.append('description', data.description)
        formData.append('small_description', data.small_description)
        formData.append('brand_id', data.brand_id)
        formData.append('category_id', data.category_id)
        
        data?.images.forEach(image => {
            console.log(image)
            formData.append('images',image[0])
        });

         formData.append('variants',JSON.stringify(data.variants))
        

        addProduct(formData)
        // for( let i of formData.entries()){
        //     console.log(i)
        // }
    };

    console.log(errors);

    return (
        <>
            <Header heading="Add Product" goback />
            <form
                className="mr-3 m-0 md:m-5 flex flex-wrap"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="w-[100%] md:w-[50%] xl:w-[30%] h-90  md:mr-5">
                    <ImageGroupComponent
                        register={register}
                        watch={watch} //cahnge
                        error={errors.images}
                        setValue={setValue}
                    />
                </div>
                <div className="w-[100%] md:w-[40%] xl:w-[65%] md:mt-5">
                    <InputComponent
                        label={"Product Name"}
                        register={register("name", {
                            required: "Product name is required",
                        })}
                        error={errors.name}
                    />
                    <InputComponent
                        label={"Product Small Description"}
                        register={register("small_description", {
                            required: "Small description is required",
                        })}
                        error={errors.small_description}
                    />
                
                    <div className="flex w-full gap-2">
                        <InputComponent
                            label={"Price"}
                            register={register("price", {
                                required: "Price is required",
                                min: {
                                    value: 0,
                                    message: "Price cannot be negative",
                                },
                            })}
                            error={errors.name}
                        />
                        <InputComponent
                            label={"Discount"}
                            register={register("discount", {
                                min: {
                                    value: 0,
                                    message: "Discount cannot be negative",
                                },
                                max: {
                                    value: 100,
                                    message: "Discount cannot exceed 100%",
                                },
                            })}
                            error={errors.discount}
                        />
                    </div>
                </div>
                <div className="w-[100%] md:w-[100%] xl:w-[100%] md:my-5">
                    <div className="flex w-full gap-2">
                        <InputComponent
                            select
                            label={"Brand"}
                            options={brands.map((x) => ({
                                label: x.name,
                                value: x._id,
                            }))}
                            register={register("brand_id", {
                                required: "Brand is required",
                            })}
                            error={errors.brand_id}
                        />
                        <InputComponent
                            select
                            
                            label={"Category"}
                            options={categories.map((x) => ({
                                label: x.name,
                                value: x._id,
                            }))}
                            register={register("category_id", {
                                required: "Category is required",
                            })}
                            error={errors.category_id}
                        />
                    </div>
                    <InputComponent textarea label={"Descripiton"} register={register("description", {
                                required: "Discription is required",
                            })} error={errors.description}/>
                    <div className="bg-white p-5 shadow-xl rounded-2xl">
                        <h1 className="font-bold ">Variant</h1>
                        <div className="flex w-full  gap-5 flex-wrap ">
                            {fields.map((field, index) => (
                                <VariantComponent
                                    key={field.id}
                                    field={field}
                                    index={index}
                                    value={{
                                        color: field.color,
                                        size: field.size,
                                        stock : field.stock
                                    }}
                                    onEditVariant={(val)=>update(index, {...val})}
                                    remove={remove}
                                />
                            ))}

                            <VariantComponent
                                onAddVariant={(val) => append(val)}

                            />
                        </div>
                        {errors.variants && (
                            <p className="text-red-500">
                                At least one variant is required
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end gap-4">
                        <button 
                            disabled={status === 'pending'}
                            type="submit"
                            className="px-6 py-3 bg-indigo-600 rounded-lg font-semibold text-white hover:bg-indigo-700 transition"
                        >
                         {status}   Add Product
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};
export default AddProduct;
