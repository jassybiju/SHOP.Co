import { useEffect } from "react";
import Input from "../../components/Input";
import { useModal } from "../../components/ModalContext";
import { createPortal } from "react-dom";
const ShowModal = () => {
    const { showModal, modalContent } = useModal();

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [showModal]);
    if (!showModal) return null;

    return createPortal(
        <div className="h-screen flex top-0 justify-center items-center w-screen absolute z-99 bg-gray-50/80">
            <div className="w-[70%] ">{modalContent}</div>
        </div>,
        document.body
    );
};
export default ShowModal;
