import { ImageUp } from "lucide-react";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import ImageCropperModal from "./ImageCropperModal";

export const ImageComponent = ({
    name = "",
    register = () => ({}),
    registerObj,
    previewImg = "",
    readonly,
    size=100,
    setValue = () => {},
    watch = () => {}, //chagne
}) => {
    console.log(previewImg);
    const [preview, setPreview] = useState(previewImg);
    const images = watch("images");
    useEffect(() => {
        setPreview(previewImg);
    }, [setPreview, previewImg]);
    console.log(images, 8881)

    const [ showCropper, setShowCropper ] = useState(false);
    const hiddenInputRef = useRef();

    const updateImage = (file) => {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        const fileList = dataTransfer.files;
        console.log(file, fileList);

        if (hiddenInputRef.current) {
            hiddenInputRef.current.files = fileList;
            console.log(fileList, file, hiddenInputRef.current.files);
            console.log(setValue, name, fileList);
            setValue(name, [file]);
            console.log(images)
        }
        const urlImage = URL.createObjectURL(file);
        setPreview(urlImage);
    };

    // const onUpload = () => hiddenInputRef.current.click();
    const onUpload = () => {
        if(!readonly){
        // setModalContent(<ImageCropperModal updateImage={updateImage} />);
        setShowCropper(true);
        }
    };
    console.log(registerObj, name);
    // const handleUploadFile = (e) => {
    //     const file = e.target.files[0];

    //     const urlImage = URL.createObjectURL(file);
    //     console.log("--------------------");
    //     setPreview(urlImage);
    // };

    const {
        ref: registerRef = () => {},
        onChange: registerOnChange = () => {},
        ...registerRest
    } = register(name, registerObj);

    return (
        <>
            <button
                className="rounded-xl w-full h-full bg-gray-300 flex justify-center items-center flex-col"
                type='button'
                onClick={(e)=>{e.preventDefault(); onUpload()}}
            >
                {preview ? (
                    <img
                        src={preview}
                        alt=""
                        style={{
                            width: `${size}%`,
                            height: `${size}%`,
                            objectFit: "contain",
                        }}
                    />
                ) : (
                    <>
                        <ImageUp />
                        Upload Your image
                    </>
                )}
            </button>
            {showCropper && <ImageCropperModal updateImage={updateImage} closeModal={()=>setShowCropper(false)}/>}
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

                    registerOnChange(e);
                }}
            />
        </>
    );
};

