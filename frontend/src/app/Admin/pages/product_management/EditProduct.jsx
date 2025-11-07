import React from "react";
import { ImageUp, Loader2, Trash2 } from "lucide-react";
import Header from "../../components/Header";
import { useRef, useState } from "react";
import InputComponent from "../../../../components/InputComponent";
import Dropdown from "../../../../components/Dropdown";
import { useModal } from "../../../../hooks/useModal";
import AddVariant from "./components/AddVariant";
import { useGetAllBrands } from "../../hooks/useBrandManagement";
import { useGetAllCategories } from "../../hooks/useCategoryManagement";
import { useForm, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import { useAddProduct, useEditProduct, useGetProduct } from "../../hooks/useProductManagement";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import EditVariant from "./components/EditVariant";
import VariantComponent from "./components/VariantComponent";
import { ImageGroupComponent } from "./components/ImageGroupComponent";
import useConfirmationModal from "../../hooks/useConfirmationModal";
import Loader from "../../../../components/Loader";
const EditProduct = () => {
	// const [variants, setVariants] = useState([{ color: "#000", size: "M" }]);
	const { id } = useParams();
	const { data: product, status: DataLoadingStatus } = useGetProduct(id);
	const navigate = useNavigate();
	const { mutate: editProduct, status } = useEditProduct();
	const {
		register,
		handleSubmit,
		control,
		reset,
		trigger,
		setValue,
		formState: { errors },
	} = useForm();

	const { fields, append, remove, update } = useFieldArray({
		control,
		name: "variants",
		rules: {
			validate: (value) => value.length > 0 || "At Least one variant is required",
		},
	});
	console.log(errors);
	const confirmation = useConfirmationModal();
	const { data: { data: brands } = { data: [] } } = useGetAllBrands({
		limit: 100,
	});
	const { data: { data: categories } = { data: [] } } = useGetAllCategories();

	useEffect(() => {
		if (product?.data) {
			console.log(product);
			reset({
				...product.data,
				images: product?.data?.images.map((x) => x.url),
			});
			console.log(product);
			console.log({
				...product.data,
				images: product?.data?.images.map((x) => x.url),
			});
		}

		console.log(123);
	}, [product, reset]);

	if (DataLoadingStatus === "pending") {
		return <Loader />;
	}

	const onSubmit = (data) => {
		console.log(data, "----------------------");
		console.log(data.description, 444);
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("price", data.price);
		formData.append("discount", data.discount);
		formData.append("description", data.description);
		formData.append("small_description", data.small_description);
		formData.append("brand_id", data.brand_id);
		formData.append("category_id", data.category_id);

		data?.images.forEach((image) => {
			let is_new = 0;
			console.log(image, 998);
			if (image[0] instanceof File) {
				is_new = 1;
				formData.append("images", image[0]);
			} else {
				formData.append("images", image);
			}
			formData.append("imagesData", JSON.stringify({ is_new }));
			// formData.append('images',typeof image === 'string' ? image : image[0] )
		});

		formData.append("variants", JSON.stringify(data.variants));

		editProduct(
			{ id, formData },
			{
				onError: (res) => {
					console.log(res);
					toast.error(res.response.data.message);
				},
				onSuccess: (res) => {
					console.log(res);
					toast.success(res.message);
					navigate("/admin/product-management/");
				},
			}
		);
		for (let i of formData.entries()) {
			console.log(i);
		}
	};

	return (
		<>
			<Header heading="Edit Product" goback />
			<form
				className="mr-3 m-0 md:m-5 flex flex-wrap"
				onSubmit={(e) => {
					e.preventDefault();
					trigger().then((x) => x && confirmation(handleSubmit(onSubmit)));
				}}
			>
				<div className="w-[100%] md:w-[50%] xl:w-[30%] h-90  md:mr-5">
					<ImageGroupComponent setValue={setValue} register={register} errors={errors.images} value={product?.data.images.map((x) => x.url)} />
				</div>
				<div className="w-[100%] md:w-[40%] xl:w-[65%] md:mt-5">
					<InputComponent
						required
						label={"Product Name"}
						register={register("name", {
							required: "Product name is required",
						})}
						errors={errors.name}
					/>
					<InputComponent
						required
						label={"Product Small Description"}
						register={register("small_description", {
							required: "Small description is required",
						})}
						errors={errors.small_description}
					/>

					<div className="flex w-full gap-2">
						<InputComponent
							required
							label={"Price"}
							register={register("price", {
								required: "Price is required",
								min: {
									value: 1,
									message: "Price cannot be less than 0",
								},
							})}
							errors={errors.price}
						/>
						<InputComponent
							required
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
							errors={errors.discount}
						/>
					</div>
				</div>
				<div className="w-[100%] md:w-[100%] xl:w-[100%] md:my-5">
					<div className="flex w-full gap-2">
						<InputComponent
							required
							select
							label={"Brand"}
							options={brands.map((x) => ({
								label: x.name,
								value: x._id,
							}))}
							register={register("brand_id", {
								required: "Brand is required",
							})}
							value={product.data.brand_id}
							errors={errors.brand_id}
						/>
						<InputComponent
							required
							select
							label={"Category"}
							options={categories.map((x) => ({
								label: x.name,
								value: x._id,
							}))}
							register={register("category_id", {
								required: "Category is required",
							})}
							value={product.data.category_id}
							errors={errors.category_id}
						/>
					</div>
					<InputComponent
						required
						textarea
						label={"Description"}
						register={register("description", {
							required: "Description is required",
						})}
					/>
					<div className="bg-white p-5 shadow-xl rounded-2xl">
						<h1 className="font-bold ">* Variant</h1>
						<div className="flex w-full  gap-5 flex-wrap ">
							{fields.map((field, index) => (
								<VariantComponent
									key={field.id}
									field={field}
									index={index}
									value={{
										color: field.color,
										size: field.size,
										stock: field.stock,
									}}
									remove={remove}
									onEditVariant={(val) => update(index, { ...val })}
								/>
							))}

							<VariantComponent onAddVariant={(val) => append(val)} />
						</div>
						{errors.variants && <p className="text-red-500">At least one variant is required</p>}
					</div>

					<div className="flex justify-end gap-4">
						<button
							disabled={status === "pending"}
							type="submit"
							className="px-6 py-3 flex bg-indigo-600 rounded-lg font-semibold text-white hover:bg-indigo-700 transition disabled:bg-indigo-700"
						>
							{status === "pending" && <Loader2 className=" animate-spin " />} Edit Product
						</button>
					</div>
				</div>
			</form>
		</>
	);
};
export default EditProduct;

// const ImageGroupComponent = ({
//     register,
//     error,
//     value = [null, null, null, null],
//     readonly = false,
// }) => {
//     console.log(value);
//     return (
//         <div className="grid grid-cols-3 grid-rows-3 w-[100%] h-[100%] gap-3 m-1 relative">
//             <div className="">
//                 <ImageComponent
//                     previewImg={value[1]}
//                     register={register}
//                     readonly={readonly}
//                     name={"images[1]"}
//                     registerObj={{
//                         validate: (val) => {
//                             if (typeof val === "string" && val.length > 0)
//                                 return true;
//                             if (val instanceof FileList && val.length > 0)
//                                 return true;
//                             return "Image Requried";
//                         },
//                     }}
//                 />
//             </div>
//             <div className="row-span-3 col-span-2">
//                 <ImageComponent
//                     readonly={readonly}
//                     previewImg={value[0]}
//                     register={register}
//                     name={"images[0]"}
//                     registerObj={{
//                         validate: (val) => {
//                             if (typeof val === "string" && val.length > 0)
//                                 return true;
//                             if (val instanceof FileList && val.length > 0)
//                                 return true;
//                             return "Main Image Requried";
//                         },
//                     }}
//                 />
//             </div>
//             <div className=" ">
//                 <ImageComponent
//                     readonly={readonly}
//                     previewImg={value[2]}
//                     register={register}
//                     name={"images[2]"}
//                 />
//             </div>
//             <div className="">
//                 <ImageComponent
//                     readonly={readonly}
//                     previewImg={value[3]}
//                     register={register}
//                     name={"images[3]"}
//                 />
//             </div>
//             <h2 className="absolute -bottom-5 text-red-500">
//                 {error && error.filter((x) => x)[0]?.message}
//             </h2>
//         </div>
//     );
// };

// const ImageComponent = ({
//     name = "",
//     register = () => ({}),
//     registerObj,
//     previewImg = "",
//     readonly,
// }) => {
//     console.log(previewImg);
//     const [preview, setPreview] = useState(previewImg);

//     useEffect(() => {
//         setPreview(previewImg);
//     }, [setPreview, previewImg]);

//     const hiddenInputRef = useRef();
//     const onUpload = () => hiddenInputRef.current.click();
//     console.log(registerObj, name);
//     const handleUploadFile = (e) => {
//         const file = e.target.files[0];
//         const urlImage = URL.createObjectURL(file);
//         console.log("--------------------");
//         setPreview(urlImage);
//     };

//     const {
//         ref: registerRef = () => {},
//         onChange: registerOnChange = () => {},
//         ...registerRest
//     } = register(name, registerObj);

//     return (
//         <>
//             <div
//                 className="rounded-xl w-full h-full bg-gray-300 flex justify-center items-center flex-col"
//                 onClick={onUpload}
//             >
//                 {preview ? (
//                     <img src={preview} alt="" />
//                 ) : (
//                     <>
//                         <ImageUp />
//                         Upload Your image
//                     </>
//                 )}
//             </div>
//             <input
//                 {...registerRest}
//                 disabled={readonly}
//                 type="file"
//                 className="hidden"
//                 ref={(e) => {
//                     registerRef(e);
//                     hiddenInputRef.current = e;
//                 }}
//                 onChange={(e) => {
//                     handleUploadFile(e);
//                     registerOnChange(e);
//                 }}
//             />
//         </>
//     );
// };
