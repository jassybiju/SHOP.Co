import { X } from "lucide-react";

const ModalWrapper = ({ render , onX }) => {
    console.log(onX)
    return (
        <div className="fixed inset-0 py-10 pt-50 bg-gray-50/50 bg-opacity-40 h-screen flex flex-col items-center justify-center z-50 h-[90%] overflow-y-scroll">
            <div className="flex justify-end w-3/4 "><button onClick={onX} className="bg-gray-200 p-4 rounded-full"><X className="text-red-900" /></button></div>

            {render}
        </div>
    );
};
export default ModalWrapper;
