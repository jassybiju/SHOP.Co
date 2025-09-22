import { ImageComponent } from "./ImageComponent";

export const ImageGroupComponent = ({
    register,
    error,
    value = [null, null, null, null],
    watch, //change
    setValue,
    readonly = false,
}) => {
    console.log(value);
    return (
        <div className="grid grid-cols-3 grid-rows-3 w-[100%] h-[100%] gap-3 m-1 relative">
            <div className="">
                <ImageComponent
                    previewImg={value[1]}
                    register={register}
                    readonly={readonly}
                    watch={watch}
                    setValue={setValue}
                    name={"images[1]"}
                    // registerObj={{
                        //     validate: (val) => {
                            //         if (typeof val === "string" && val.length > 0)
                            //             return true;
                        //         if (val instanceof FileList && val.length > 0)
                        //             return true;
                        //         return "Image Requried";
                        //     },
                        // }}
                        />
            </div>
            <div className="row-span-3 col-span-2">
                <ImageComponent 
                        setValue={setValue}
                        readonly={readonly}
                        previewImg={value[0]}
                        register={register}
                        watch={watch}
                        name={"images[0]"}
                        registerObj={{
                            // validate: (val) => {
                            //     console.log(val)
                            //         if (typeof val === "string" && val.length > 0)
                            //             return true;
                            //     if (val instanceof FileList && val.length > 0)
                            //         return true;
                            //     console.log(val)
                            //     return "Main Image Requried";
                            // },
                        }}
                        />
            </div>
            <div className=" ">
                <ImageComponent
                        setValue={setValue}
                        readonly={readonly}
                        previewImg={value[2]}
                        register={register}
                        name={"images[2]"}
                />
            </div>
            <div className="">
                <ImageComponent
                    readonly={readonly}
                    previewImg={value[3]}
                        setValue={setValue}
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

