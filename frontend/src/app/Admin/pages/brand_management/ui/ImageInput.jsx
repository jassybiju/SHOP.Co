import { useState } from "react";
import { useRef } from "react";

const ImageInput = ({ register }) => {
    const hiddenInputRef = useRef();
    const [preview, setPreview] = useState();

    const { ref: imageRef, onChange: imageOnchage, ...rest } = register;

    const handleUploadFile = (e) => {
        const file = e.target.files[0];

        const urlImage = URL.createObjectURL(file);
        setPreview(urlImage);
    };

    const onUpload = () => hiddenInputRef.current.click();

    const uploadButtonLabel = preview && "Upload Image";
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
            />
            <div className="w-[50%] border-2 h-[250px]" onClick={onUpload}>
                {uploadButtonLabel}
                <img src={preview} alt="" className="h-full mx-auto" />
            </div>
            <p className="text-red-500"></p>
        </div>
    );
};
export default ImageInput;
