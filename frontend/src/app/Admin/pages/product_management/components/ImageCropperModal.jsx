import { X } from "lucide-react";
import { useModal } from "../../../../../hooks/useModal";
import { useState } from "react";
import {
    centerCrop,
    convertToPixelCrop,
    makeAspectCrop,
    ReactCrop,
} from "react-image-crop";
import setCanvasPreview from "./setCanvarPreview";
import { useRef } from "react";
import toast from "react-hot-toast";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 100;

const ImageCropperModal = ({ updateImage }) => {
    const { closeModal } = useModal();

    const [imgSrc, setImgSrc] = useState("");
    const [crop, setCrop] = useState();
    const [error, setError] = useState("");

    const imgRef = useRef();
    const previewCanvasRef = useRef();

    const onSelectFile = (e) => {
        const file = e.target.files?.[0];

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
        ];

        if (!allowedTypes.includes(file.type)) {
            toast.error("Invalid Image type");
            closeModal();
            return;
        }
        if (!file) return;
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageElement = new Image();
            const imageUrl = reader.result?.toString() || "";
            imageElement.src = imageUrl;

            imageElement.addEventListener("load", (e) => {
                if (error) setError("");
                const { naturalWidth, naturalHeight } = e.currentTarget;
                if (
                    naturalWidth < MIN_DIMENSION ||
                    naturalHeight < MIN_DIMENSION
                ) {
                    setError("Image must be at least 150 x 150 pixels.");
                    return setImgSrc("");
                }
            });
            setImgSrc(imageUrl);
        });
        reader.readAsDataURL(file);
    };

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;

        const crop = makeAspectCrop(
            { unit: "%", width: (MIN_DIMENSION / width) * 100 },
            ASPECT_RATIO,
            width,
            height
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    };

    const handleCrop = () => {
        console.log(imgRef.current);
        setCanvasPreview(
            imgRef.current, // HTMLImageElement
            previewCanvasRef.current, // HTMLCanvasElement
            convertToPixelCrop(
                crop,
                imgRef.current.width,
                imgRef.current.height
            )
        );
        previewCanvasRef.current.toBlob((blob) => {
            if (!blob) return;
            const file = new File([blob], "cropped.jpg", {
                type: "image/jpeg",
            });

            updateImage(file);

            closeModal();
        }, "image/jpeg");
    };

    return (
        <div>
            <X onClick={closeModal} />
            <label className="block mb-3 w-fit">
                <span className="sr-only">Choose profile photo</span>
                <input
                    type="file"
                    accept="image/*"
                    onChange={onSelectFile}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
                />
            </label>
            {error && <p className="text-bold text-red-600">{error}</p>}
            {imgSrc && (
                <div className="flex flex-col items-center">
                    <ReactCrop
                        crop={crop}
                        keepSelection
                        aspect={ASPECT_RATIO}
                        minWidth={MIN_DIMENSION}
                        onChange={(pixelCrop, percentCrop) =>
                            setCrop(percentCrop)
                        }
                    >
                        <img
                            ref={imgRef}
                            src={imgSrc}
                            alt="Upload"
                            style={{ maxHeight: "70vh" }}
                            onLoad={onImageLoad}
                        />
                    </ReactCrop>
                    <button
                        className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-sky-500 hover:bg-sky-600"
                        onClick={handleCrop}
                    >
                        Crop Image
                    </button>
                </div>
            )}
            {crop && (
                <canvas
                    ref={previewCanvasRef}
                    className="mt-4"
                    style={{
                        display: "none",
                        border: "1px solid black",
                        objectFit: "contain",
                        width: 150,
                        height: 150,
                    }}
                />
            )}
        </div>
    );
};
export default ImageCropperModal;
