import { useEffect, useState } from "react";
import { useRef } from "react";

const ImageInput = ({ register ={}, previewImg , readonly=false}) => {
    const hiddenInputRef = useRef();
    const [preview, setPreview] = useState();

    useEffect(()=>{
        if(previewImg){
            setPreview(previewImg)
        }
    },[previewImg, setPreview])
    console.log(readonly)
    const { ref: imageRef = ()=> {}, onChange: imageOnchage = ()=>{}, ...rest } = register;

    const handleUploadFile = (e) => {
        const file = e.target.files[0];

        const urlImage = URL.createObjectURL(file);
        setPreview(urlImage);
    };

    const onUpload = () => hiddenInputRef.current.click();

    const uploadButtonLabel = readonly ? 'Read Only' : preview && "Upload Image";
    return (
        <div className="mb-6">
            <label
                htmlFor="Brand-name"
                className="block text-gray-700 font-medium mb-2"
            >
                Brand Image
            </label>
            <input
                ref={(e) => {
                    imageRef(e);
                    hiddenInputRef.current = e;
                }}
                {...rest}
                type="file"
                onChange={(e) => {
                    handleUploadFile(e);
                    imageOnchage(e)
                }}
                className=" hidden "
                disabled={readonly}
            />
            <button className="w-[50%] border-2 h-[250px]" onClick={onUpload}>
                {uploadButtonLabel}
                <img src={preview} alt="" className="h-full mx-auto" />
            </button>
            <p className="text-red-500"></p>
        </div>
    );
};
export default ImageInput;
