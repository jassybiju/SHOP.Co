import { X } from "lucide-react";

const ModalWrapper = ({ render , onX, xRequired = false }) => {
    console.log(onX)
    return (
        <div className="fixed inset-0 py-10  bg-gray-50/50 bg-opacity-40  flex flex-col items-center justify-center z-50 h-screen overflow-y-scroll">
            {xRequired && <div className="flex justify-end w-3/4 "><button onClick={onX} className="bg-gray-200 p-4 rounded-full"><X className="text-red-900" /></button></div>}

            {render}
        </div>
    );
};
export default ModalWrapper;
