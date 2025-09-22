import Input from "../../components/Input";
import { useModal } from "../Admin/hooks/ModalContext";

const ShowModal = () => {
    const { showModal, modalContent } = useModal();
    if (!showModal) return null;
  
    return (
        <div className="h-screen flex justify-center items-center w-screen absolute z-99 bg-gray-50/80">
            <div className="w-[70%] ">
               {modalContent}
            </div>
        </div>
        
    );
};
export default ShowModal;
